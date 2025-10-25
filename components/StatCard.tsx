import React from "react";

type StatCardProps = {
  title?: string;
  className?: string;
  children: React.ReactNode;
};

export const StatCard: React.FC<StatCardProps> = ({ title, className, children }) => {
  return (
    <section
      className={[
        // Contenedor principal
        "rounded-2xl bg-white",
        // Borde y halo AZUL
        "border border-blue-300",
        "ring-1 ring-blue-100",
        // Sombra azul suave (custom rgba para un look pro)
        "shadow-[0_10px_28px_rgba(29,78,216,0.18)]",
        "p-5",
        className || "",
      ].join(" ")}
    >
      {title ? <h3 className="text-lg font-semibold mb-3">{title}</h3> : null}
      {children}
    </section>
  );
};
