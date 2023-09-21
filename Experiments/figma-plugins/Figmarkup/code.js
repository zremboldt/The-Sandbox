// Skip over invisible nodes and their descendants inside instances for faster performance.
figma.skipInvisibleInstanceChildren = true

figma.showUI(__html__);
// figma.ui.resize(300, 200)

figma.ui.onmessage = msg => {
  let totalElementCount = 0;
  let checkboxOptionCount = 0;
  let shouldIncludeComponentDependencies = false;

  let imports = {
    PropTypes: "import PropTypes from '@root/vendor/prop-types';",
    React: "import React from '@root/vendor/react';",
    Styles: "import { StyleSheet, Theme } from '@root/core/src/utils/styles';",
  };
  
  const handleImports = (name) => {
    if (Object.keys(imports).includes(name)) { return };

    const importMap = {
      Input: "import Input from '@root/core/src/components/input';",
      Separator: "import Separator from '@root/core/src/components/separator';",
      Button: "import Button, { BUTTON_SIZE_SMALL, BUTTON_VARIANT_SECONDARY } from '@root/core/src/components/button';",
      CheckboxOption: "import CheckboxOption from '@root/core/src/components/checkbox-option';",
    }

    imports[name] = importMap[name];
  }

  const generateLevel = (node) => {
    const markup = node.children.map((node) => {
      totalElementCount++;
      
      if (node.type === 'TEXT') {
        const textStyle = figma.getStyleById(node.textStyleId);

        if (textStyle.name.includes('H1')) { return `<h1>${node.characters}</h1>` }
        if (textStyle.name.includes('H2')) { return `<h2>${node.characters}</h2>` }
        if (textStyle.name.includes('H3')) { return `<h3>${node.characters}</h3>` }
        if (textStyle.name.includes('H4')) { return `<h4>${node.characters}</h4>` }
        if (textStyle.name.includes('H5')) { return `<h5>${node.characters}</h5>` }
        if (textStyle.name.includes('H6')) { return `<h6>${node.characters}</h6>` }
        if (textStyle.name.includes('P1')) { return `<p css={styles.p1}>${node.characters}</p>` }
        if (textStyle.name.includes('P2')) { return `<p css={styles.p2}>${node.characters}</p>` }
        
        return `<p>${node.characters}</p>`
      }
      
      if (node.type === 'INSTANCE') {
        if (node.name === 'Input') {
          handleImports('Input');
          let label = `label={''} `;

          node.children.map((child) => {
            if (child.name === 'Label') { label = `label={'${child.characters}'} `}

            if (child.children) {
              child.children.map((child) => {
                if (child.name === 'Label') { label = `label={'${child.characters}'} `}
              })
            }
          })

          return `<Input ${label}onChange={() => {}} />`;
        }

        if (node.name === 'Checkbox Input') {
          let label = `label={''} `;
          let name = `name={'checkbox-${checkboxOptionCount}'} `;
          let id = `id={'checkbox-${checkboxOptionCount}'} `;

          if (!node.children) { return; }
          node.children.map((child) => {
            if (!child.children) { return; }
            child.children.map((child) => {
              if (child.name === 'Label') { label = `label={'${child.characters}'} `}
            })
          })

          checkboxOptionCount++;
          handleImports('CheckboxOption');
          return `<CheckboxOption ${id}${name}${label}isSelected={true} onChange={() => {}} optionValue={'true'} />`;
        }

        if (node.name === 'Seperator') {
          handleImports('Separator');
          return `<Separator />`;
        }
        
        if (node.name === 'Button') {
          handleImports('Button');
          const buttonText = node.children[0].characters
          let size = '';
          let variant = '';
          
          if (node.variantProperties.Size === 'small') { size = `size={BUTTON_SIZE_SMALL} `}
          if (node.variantProperties.Variant === 'secondary') { variant = `variant={BUTTON_VARIANT_SECONDARY} `}
          
          return `<Button ${size}${variant}onClick={() => {}}>${buttonText}</Button>`;
        }
      }
      
      if (node.type === 'GROUP') {
        return `<div>\n${generateLevel(node)}\n</div>`
      }

      if (node.type === 'FRAME') {
        // If first element is a frame we know the user selected the whole scene rather than a portion of it.
        if (totalElementCount === 1) { shouldIncludeComponentDependencies = true }
        
        return `<div>\n${generateLevel(node)}\n</div>`
      }
    })
    
    return markup.join('\n');
  }

  const composeMarkup = () => {
    if (!figma.currentPage.selection[0]) { return 'PLEASE SELECT A FRAME OR SET OF COMPONENTS TO GET STARTED.' }

    const bodyString = generateLevel(figma.currentPage.selection[0])
    const importString = Object.values(imports).join('\n');
    const componentWrapString = `export default function ComponentName() {\nreturn(\n${bodyString}\n);\n}`;
    const propTypeString = `ComponentName.propTypes = {};`;
    const styleString = `const styles = StyleSheet.create({\np1: { ...Theme.paragraph1() },\np2: { ...Theme.paragraph2() },\nrow: { display: 'flex' },\n});`;

    if (!shouldIncludeComponentDependencies) { return bodyString; }
    return `${importString}\n\n${componentWrapString}\n\n${propTypeString}\n\n${styleString}`
  }

  if (msg.type === 'generate-for-web') {
    const markup = composeMarkup();
    console.log(markup);
    figma.ui.postMessage(markup);
  }
  
  if (msg.type === 'generate-for-mobile') {
    console.log('MOBILE GENERATOR HAS NOT BEEN IMPLEMENTED YET.')
  }

  if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }
}