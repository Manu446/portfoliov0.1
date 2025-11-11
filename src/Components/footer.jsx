import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <div className="muted">© {year} Immanuel Obure — Built with ❤️ and vanilla JS</div>
    </footer>
  );
}
