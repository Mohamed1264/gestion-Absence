import { Ellipsis } from "lucide-react";
import { useRef } from "react";
import { useTableContext } from "../Context";

function DropDownMenu({ item, children, key = 'id' }) {
  const { selectedItem, setSelectedItem } = useTableContext();
  const menu = useRef(null);

  const toggleMenu = () => {
    setSelectedItem(selectedItem && selectedItem[key] === item[key] ? null : item);
    console.log(item);
  };

  return (
    <div className="relative inline-block text-left" ref={menu}>
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 px-4 py-2"
      >
        <Ellipsis
          size={20}
          className={`text-gray-700 dark:text-gray-50 transition-transform duration-200 ${
            selectedItem && selectedItem.id === item.id ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {selectedItem && selectedItem.id === item.id && (
        <div className="absolute -right-6 z-50 min-w-max rounded-lg bg-white dark:bg-gray-500 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-2 space-y-2 divide-y">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDownMenu;