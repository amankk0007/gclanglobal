import { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, Building, Award } from "lucide-react";

const stats = [
  { value: 2022, label: "Since", prefix: "", icon: TrendingUp },
  { value: 10000, label: "Students Guided", suffix: "+", icon: Users },
  { value: 50, label: "Partner Universities", suffix: "+", icon: Building },
  { value: 98, label: "Success Rate", suffix: "%", icon: Award },
];

const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsStrip = () => {
  return (
    <section className="py-10 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/5 via-transparent to-[#7C3AED]/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative group"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-border/30 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 text-center">
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#4F46E5]/10 to-[#7C3AED]/10 flex items-center justify-center group-hover:from-[#4F46E5]/20 group-hover:to-[#7C3AED]/20 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-[#7C3AED]" />
                </div>

                {/* Number */}
                <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>

                {/* Label */}
                <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] group-hover:w-1/2 transition-all duration-300 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
