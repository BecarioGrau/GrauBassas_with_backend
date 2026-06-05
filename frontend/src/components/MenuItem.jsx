import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuItem({ item, level = 0 }) {
  const hasChildren = item.children && item.children.length > 0;
  const baseLinkClass = 'peer block px-4 py-3 whitespace-nowrap text-white hover:bg-primary-dark transition-colors hover-diagonal-bg';

  return (
    <li className="relative">
      <Link to={item.href} className={baseLinkClass}>
        {item.label}
        {hasChildren}
      </Link>

      {hasChildren && (
        <ul
          className={`absolute top-0 left-full -ml-1 bg-primary min-w-[220px] opacity-0 invisible peer-hover:opacity-100 peer-hover:visible peer-focus:opacity-100 peer-focus:visible hover:opacity-100 hover:visible transition-all duration-200 shadow-lg z-50 pointer-events-auto `}
        >
          {item.children.map((child) => (
            <MenuItem key={child.label} item={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}
