import { isAdmin } from "@/access";
import { CollectionConfig } from "payload";

export const Comments: CollectionConfig = {
  slug: "comments",
  admin: {
    useAsTitle: "content",
    defaultColumns: ["post", "authorName", "status", "createdAt"],
  },
  access: {
    read: () => true,
    create: ({req}) => isAdmin({req}),
    update: ({req}) => isAdmin({req}),
    delete: ({req}) => isAdmin({req}),
  },
  fields: [
    {
      name: "post",
      type: "relationship",
      relationTo: "posts",
      required: true,
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "comments",
      required: false,
    },
    {
      name: "authorName",
      type: "text",
      required: true,
    },
    {
      name: "authorEmail",
      type: "email",
      required: true,
    },
    {
      name: "content",
      type: "textarea",
      required: true,
    },
    {
      name: "status",
      type: "select",
      options: ["approved", "pending", "spam"],
      defaultValue: "pending",
      required: true,
    },
    {
      name: "ipAddress",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        const ip = req?.headers?.get("x-forwarded-for");
        return {
          ...data,
          ipAddress: typeof ip === "string" ? ip : Array.isArray(ip) ? ip[0] : "",
        };
      },
    ],
  },
  versions: {
    drafts: true,
  },
  timestamps: true,
};
