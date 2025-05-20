
declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      id: string; // 👈 extend with custom id
    };
  }
  interface JWT {
    id: string;
  }
}
