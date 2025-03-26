import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NewsLetter = () => {
  return (
    <section className="container py-16">
      <div className="rounded-lg border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-4 text-center">
          <h3 className="text-2xl font-bold">Stay Updated</h3>
          <p className="text-muted-foreground mx-auto max-w-md">
            Subscribe to our newsletter for exclusive deals, new restaurant
            alerts, and more!
          </p>
          <div className="mx-auto flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <Input
              placeholder="Enter your email"
              type="email"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
