function FeatureCard({ icon, title }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-md">
      <div className="text-lg">
        {icon}
      </div>

      <span className="text-sm font-medium">
        {title}
      </span>
    </div>
  );
}

export default FeatureCard;