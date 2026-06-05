import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { useNavigation } from "../context/NavigationContext";
import logo from "../assets/img/Imagotipo_GrauBassas_horizontal.webp";
import { Link, useLocation } from "react-router-dom";

const MobileMenuItem = ({ item, isActive, closeMenu }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="border-b border-white/10 last:border-none">
      <div className="flex items-center justify-between">
        <Link
          to={item.href}
          onClick={(e) => {
            if (hasChildren && item.href === "#") {
              e.preventDefault();
            } else {
              closeMenu();
            }
          }}
          className={`block py-4 px-6 text-sm font-bold uppercase tracking-wider text-white flex-grow ${
            isActive(item.href) ? "bg-primary-dark scale-105" : ""
          }`}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-4 text-white focus:outline-none"
          >
            <svg
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="bg-primary-dark/50 pl-4">
          {item.children.map((child) => (
            <MobileMenuItem
              key={child.label}
              item={child}
              isActive={isActive}
              closeMenu={closeMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { menuData, productsData, loading } = useNavigation();
  const location = useLocation();
  const currentPath = location.pathname;

  const fullMenu = React.useMemo(() => {
    if (loading || !menuData.length) return [];
    return [menuData[0], ...productsData, ...menuData.slice(1)];
  }, [menuData, productsData, loading]);

  function isActive(href) {
    if (href === "#" || !href) return false;
    const normalized = href === "/" ? "/" : href.replace(/\/?$/, "");
    const cur = currentPath === "/" ? "/" : currentPath.replace(/\/?$/, "");
    if (normalized === "/") return cur === "/";
    return cur.startsWith(normalized);
  }

  if (loading)
    return <div className="h-20 bg-white border-b-4 border-primary" />;

  return (
    <header className="bg-white border-b-4 border-primary sticky top-0 overflow-visible z-50">
      <nav className="flex h-20 w-full items-stretch">
        <div className="flex-grow lg:flex-none flex items-center justify-between px-4 xl:px-8 bg-white z-50 relative min-w-0">
          <Link to="/">
            <img
              src={logo}
              alt="Logo GrauBassas"
              className="h-10 lg:h-12 w-auto object-contain"
              width={220}
              height={48}
            />
          </Link>

          <button
            className="lg:hidden ml-4 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex flex-grow relative items-stretch text-white min-w-0">
          <div
            className="absolute inset-0 bg-primary -z-10"
            style={{ clipPath: "polygon(40px 0, 100% 0, 100% 100%, 0% 100%)" }}
          />

          <ul className="flex w-full h-full text-[12px] xl:text-[13px] 2xl:text-sm font-bold uppercase tracking-tight xl:tracking-wider">
            {fullMenu.map((item) => (
              <li key={item.label} className="flex-1 group relative hover:z-20">
                <Link
                  to={item.href}
                  className={`relative h-full flex items-center justify-center px-1 text-center transition-all duration-300
                    before:absolute before:inset-0 before:-z-10 before:transition-all before:duration-300
                    before:[clip-path:polygon(40px_0,100%_0,calc(100%-40px)_100%,0_100%)]
                    before:scale-x-0 group-hover:before:scale-x-100 group-hover:before:bg-primary-dark
                    ${
                      isActive(item.href)
                        ? "before:scale-x-100 before:bg-primary-dark text-white"
                        : "text-white/90 hover:text-white"
                    }
                  `}
                >
                  <span className="relative z-10 px-2 leading-tight transition-transform group-hover:scale-105">
                    {item.label}
                  </span>
                </Link>

                {item.children && (
                  <ul className="absolute top-full left-0 bg-primary min-w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible shadow-2xl z-50 border-t-2 border-primary-dark transition-all duration-200">
                    {item.children.map((child) => (
                      <MenuItem key={child.label} item={child} />
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`lg:hidden absolute top-20 left-0 w-full bg-primary shadow-xl transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <div className="flex flex-col max-h-[calc(100vh-80px)] overflow-y-auto">
            {fullMenu.map((item) => (
              <MobileMenuItem
                key={item.label}
                item={item}
                isActive={isActive}
                closeMenu={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
