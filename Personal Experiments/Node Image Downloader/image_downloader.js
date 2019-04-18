const fs = require("fs");
const request = require("request");

const whyHustler = [
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/06cdd234b22854523cfa409c1779e0a5302290f3.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/0ea14e643d44a2e418692a31ec48ac64ffda8cd3.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/f9f2407dd32632bb953c56f93b267efa50e53fd9.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/2260b42a806e81aa1760dddc27e7754b92c5d01f.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/0bc76be493474a87c22341b1955622bc59b9c9a5.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/8721e443089693d7fffd60209c72973dc01f7671.jpg"
];

const raptorFeatures = [
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/6b8c888dff8dab4561dad01dd82f824a04b6d327.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/53fbe3a362c6cc67659892601001474485a8d66d.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/bb477e5bb19b286a48163eecf4e3c01aae08a710.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/889bc5f4d3cae2dce6d6add63a3ee983c492c610.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/3c97c285f5b31d2d93c510ec3da3cb67b6ec75a6.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/9884e465aaa07ecbf2475ffa71cb53faadfdd212.jpg"
];

const raptorSDFeatures = [
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/bfb89709740e7914bef90ce7c6ffae15940723a5.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/60ddbf831cde40e4c648ae2d89f6f6b43812bdb1.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/4dc7c3f71df4e5f2aa3cfc16fde0740b51fd6a16.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/07b73eebae73516978db16bf74098f8ca6c9ba49.jpg",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/22d080f3d34eb0c8bcb43235cefbeb4c1695d902.png",
  "https://9e80a562fbdc4e9e5780-013b27cf759430b2abaab4908df95006.ssl.cf2.rackcdn.com/images/3cfe096dd5800cd0ab83f0723dc90766aeab85bf.jpg"
];

const download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
};

raptorSDFeatures.forEach((img, i) => {
  download(img, `${i}.png`, function() {
    console.log("done");
  });
});
