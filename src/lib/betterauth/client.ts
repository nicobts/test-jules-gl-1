// src/lib/betterauth/client.ts
// Placeholder for BetterAuth client initialization
interface BetterAuthUser {
  id: string;
  email?: string;
  name?: string;
}

class BetterAuthClient {
  private static instance: BetterAuthClient;
  private user: BetterAuthUser | null = null;

  private constructor() {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("betterauth_user");
      if (storedUser) {
        try {
          this.user = JSON.parse(storedUser);
        } catch (e) {
          console.error("Failed to parse stored user:", e);
          localStorage.removeItem("betterauth_user");
        }
      }
    }
  }

  public static getInstance(): BetterAuthClient {
    if (!BetterAuthClient.instance) {
      BetterAuthClient.instance = new BetterAuthClient();
    }
    return BetterAuthClient.instance;
  }

  public async login(email_or_username?: string, password?: string): Promise<BetterAuthUser> {
    console.log(`Attempting login with ${email_or_username}`);
    if (email_or_username === "test@example.com" && password === "password") {
      this.user = { id: "1", email: "test@example.com", name: "Test User" };
      if (typeof window !== "undefined") {
        localStorage.setItem("betterauth_user", JSON.stringify(this.user));
      }
      return this.user;
    }
    throw new Error("Invalid credentials");
  }

  public async signup(email_or_username?: string, password?: string): Promise<BetterAuthUser> {
    console.log(`Attempting signup with ${email_or_username}`);
    this.user = { id: "2", email: email_or_username, name: "New User" };
    if (typeof window !== "undefined") {
      localStorage.setItem("betterauth_user", JSON.stringify(this.user));
    }
    return this.user;
  }

  public async logout(): Promise<void> {
    this.user = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("betterauth_user");
    }
    console.log("Logged out");
  }

  public getUser(): BetterAuthUser | null {
    if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("betterauth_user");
        if (storedUser) {
            try {
                this.user = JSON.parse(storedUser);
            } catch (e) {
                console.error("Failed to parse stored user on getUser:", e);
                localStorage.removeItem("betterauth_user");
                this.user = null;
            }
        } else {
            this.user = null;
        }
    }
    return this.user;
  }

  public onAuthStateChange(callback: (user: BetterAuthUser | null) => void): () => void {
    const initialUser = this.getUser();
    callback(initialUser);

    const handler = (event: StorageEvent) => {
      if (event.key === "betterauth_user") {
        if (event.newValue) {
          try {
            callback(JSON.parse(event.newValue));
          } catch (e) {
            callback(null);
          }
        } else {
          callback(null);
        }
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handler);
      }
    };
  }
}

export const betterAuth = BetterAuthClient.getInstance();
