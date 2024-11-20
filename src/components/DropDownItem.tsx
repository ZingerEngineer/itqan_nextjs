import Link from 'next/link'
import { navigationItem } from '../statics/landingPageNavigationLists'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface DropDownItemProps {
  dropDownItemLabel: string
  dropDownItems: navigationItem[]
}
export default function DropDownItem({
  dropDownItemLabel,
  dropDownItems
}: DropDownItemProps) {
  return (
    <div className="drop-down-wrapper relative text-white group hover:text-[#099797] cursor-default">
      {dropDownItemLabel}

      <div className="absolute grid grid-rows-none justify-start items-center max-h-0 overflow-hidden group-hover:grid-rows-1 px-6 group-hover:py-16 group-hover:border-2 group-hover:border-primary-400 bg-tertiary-dark-500 rounded-md transition-all">
        <div className="flex flex-row justify-center items-center gap-8">
          {dropDownItems.map((item, index) => {
            return (
              <div
                className=" p-5"
                key={`item-${item.label}-${index}`}
              >
                {item.type === 'link' && item.href ? (
                  <Link
                    href={item.href}
                    className="text-white font-bold hover:text-[#099797] duration-150"
                  >
                    {item.label}
                  </Link>
                ) : null}

                {item.type === 'div' ? (
                  <div className=" border-l-4 border-primary-400 pl-2">
                    <div
                      className="text-white flex flex-row items-center gap-2 text-primary-light text-xl font-bold hover:text-[#099797] duration-150"
                      key={`title-${item.label}-${index}`}
                    >
                      <div className="cursor-default">{item.label}</div>
                      {item.icon ? <FontAwesomeIcon icon={item.icon} /> : null}
                    </div>
                    <div className="w-full h-full my-1 children-wrapper flex flex-col">
                      {item.navigationItemsChildren?.map(
                        (child, childIndex) => {
                          return (
                            <div key={`child-${child.label}-${childIndex}`}>
                              <div className="text-white text-sm flex flex-row gap-2 items-center text-primary-light hover:text-[#099797] duration-150">
                                {child.type === 'link' && child.href ? (
                                  <Link
                                    className=" flex flex-row justify-center items-center gap-2"
                                    href={child.href}
                                  >
                                    {child.label}
                                    {child.icon ? (
                                      <FontAwesomeIcon icon={child.icon} />
                                    ) : null}
                                  </Link>
                                ) : null}

                                {child.type === 'div' ? (
                                  <div className="flex flex-row justify-center items-center gap-2">
                                    {child.label}
                                    {child.icon ? (
                                      <FontAwesomeIcon icon={child.icon} />
                                    ) : null}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          )
                        }
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
