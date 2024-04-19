import type { Schema, Attribute } from "@strapi/strapi";

export interface CardsCard extends Schema.Component {
  collectionName: "components_cards_cards";
  info: {
    displayName: "Card";
    icon: "apps";
    description: "";
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    date: Attribute.DateTime;
    link: Attribute.Component<"link.link", true>;
  };
}

export interface LinkLink extends Schema.Component {
  collectionName: "components_link_links";
  info: {
    displayName: "link";
    icon: "briefcase";
  };
  attributes: {
    linkText: Attribute.String;
    linkUrl: Attribute.String;
  };
}

declare module "@strapi/types" {
  export module Shared {
    export interface Components {
      "cards.card": CardsCard;
      "link.link": LinkLink;
    }
  }
}
