import "next";

declare module "next" {
  interface PageProps {
    params: {
      id: string;
    };
  }
}
