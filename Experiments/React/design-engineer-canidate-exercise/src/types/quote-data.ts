export interface QuoteData {
  id: string;
  name: string;
  tagline: string;
  priceDisplay: string;
  isRecommended: boolean;
  sections: {
    policyCoverages: Array<{
      label: string;
      value: string;
      included: boolean;
    }>;
    vehicleCoverages: Array<{
      label: string;
      value: string;
      included: boolean;
    }>;
    extras: Array<{
      label: string;
      value: string;
      included: boolean;
    }>;
  };
  ctaText: string;
}
