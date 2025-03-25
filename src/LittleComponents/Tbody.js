import DropDownMenu from "./DropDownMenu";
import { Trash2, SquareArrowOutUpRight, Edit, Expand,ClipboardList, RefreshCcw } from "lucide-react";
import { useTableContext } from "../Context";
import { Link } from "react-router-dom";

export default function Tbody({ data, config, columns, selectedItems, handleCheckboxChange }) {
  const { dropDown, resetPassword, reset, links, profile, seeAtt,permission, teacherPopUp, selects } = config;
  const { setActiveModal } = useTableContext();
  const keys = columns.map(col => col.accessor);

  return (
    <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-500 dark:bg-gray-800">
      {data.map((t, index) => (
        <tr
          key={`row${index}`}
          className="hover:bg-gray-100 even:bg-gray-50 text-gray-700 dark:text-gray-50 dark:even:bg-gray-900 dark:hover:bg-gray-600"
        >
          {/* ✅ Select Row Checkbox */}
          {selects && (
            <td className=" py-1 lg:px-5 whitespace-nowrap text-xs md:text-sm font-medium flex gap-1 flex-wrap items-start">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={selectedItems.includes(t.id)}
                  onChange={() => handleCheckboxChange(t.id)}
                />
                <div className="w-5 h-5 flex items-center justify-center border-2 border-gray-300 rounded-md peer-checked:border-purple-600 peer-checked:bg-purple-600"></div>
              </label>
            </td>
          )}

          {keys.map(key =>
            Array.isArray(t[key]) ? (
              <td
                key={key}
                className=" py-2 lg:px-5 whitespace-nowrap text-xs md:text-sm font-medium flex gap-1 flex-wrap items-center"
              >
                {t[key].map((g, index) => (
                  <span key={g + index} className="border rounded-lg px-1 py-1 text-xs dark:border-purple-300 dark:bg-purple-700">
                    {g}
                  </span>
                ))}
              </td>
            ) : (
              <td key={key} className=" py-2 lg:px-5 whitespace-nowrap text-xs md:text-sm">
                {t[key]}
              </td>
            )
          )}

          <td className=" py-2 whitespace-nowrap text-start text-sm font-medium">
            {dropDown ? (
              <DropDownMenu item={t}>
                <div>
                  {profile && (
                    <Link to={`/${links.profile}/${t.cef || t.id}`} className="rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex gap-2 items-center text-xs p-2">
                      <SquareArrowOutUpRight size={14} /> See More
                    </Link>
                  )}
                  {seeAtt &&
                     <Link to={`/attendance/${t.id}`}  className="rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex gap-2 items-center text-xs p-2">
                      <ClipboardList size={16}/> List 
                     </Link>
                  }
                  {permission &&
                      <Link to={`/givePermission/${t.id}`}  className="rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex gap-2 items-center text-xs p-2">
                      <ClipboardList size={16}/> Permission 
                    </Link>                  
                  }
                  <Link to={`/${links.edit}/${t.cef || t.matricule || t.id}`} className="rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex gap-2 items-center text-xs p-2">
                    <Edit size={14} /> Edit
                  </Link>
                </div>
              </DropDownMenu>
            ) : null}
          </td>
        </tr>
      ))}
    </tbody>
  );
}