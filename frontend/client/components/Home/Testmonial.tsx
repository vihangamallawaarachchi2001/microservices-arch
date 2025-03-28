import { Star } from "lucide-react";
import React from "react";

const Testmonial = () => {
  return (
    <section className="container py-16 md:py-24 max-w-[1366px] mx-auto px-2 md:px-0">
      <div className="flex flex-col gap-2 mb-10 text-center">
        <h2 className="text-3xl text-orange-500 font-bold tracking-tight">
          What Our Customers Say
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Don't just take our word for it - hear from some of our satisfied
          customers
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Sarah Johnson",
            comment:
              "QuickBite has changed how I eat! The delivery is always on time and the food arrives hot and fresh.",
          },
          {
            name: "Michael Chen",
            comment:
              "I love the variety of restaurants available. The app is so easy to use and the tracking feature is spot on!",
          },
          {
            name: "Jessica Williams",
            comment:
              "As a busy professional, QuickBite saves me so much time. The customer service is excellent when I've needed help.",
          },
        ].map((testimonial, index) => (
          <div key={index} className="rounded-lg border bg-card p-6 shadow">
            <div className="flex flex-col gap-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-muted-foreground">"{testimonial.comment}"</p>
              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="rounded-full bg-muted h-10 w-10 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium">{testimonial.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testmonial;
