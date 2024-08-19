import { useEventBus } from "@/EventBus";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, LockClosedIcon, LockOpenIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Fragment } from "react";

export default function UserOptionsDropdown({conversation}){
    const {emit} = useEventBus();
    const changeUserRole = () => {
        console.log("change User Role");
        if(!conversation.is_user){
            return;
        }

        axios
            .post(route("user.changeRole", conversation.id))
            .then((res) => {
                emit("toast.show", res.data.message)
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const onBlockUser = () => {
        console.log("Block user");
        if(!conversation.is_user){
            return;
        }

        axios
            .post(route("user.blockUnblock", conversation.id))
            .then((res) => {
                emit("toast.show", res.data.message)
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-black/40">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                    </Menu.Button>
                </div>
                <Transition 
                    as={Fragment}
                    enter="duration-100 ease-out transition"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-in"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <button onClick={onBlockUser}
                                        className={`${active ? "bg-black/30 text-white" : "text-gray-100"} 
                                        group flex w-full items-center rounded-md -px-2 py-2 text-sm`}
                                    >
                                        {conversation.blocked_at && (
                                            <>
                                                <LockOpenIcon className="w-4 h-4 mr-2" />
                                                Unblock User
                                            </>
                                        )}
                                        {!conversation.blocked_at && (
                                            <>
                                                <LockClosedIcon className="w-4 h-4 mr-2" />
                                                Block User
                                            </>
                                        )}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                            {({active}) => (
                                    <button onClick={changeUserRole}
                                        className={`${active ? "bg-black/30 text-white" : "text-gray-100"} 
                                        group flex w-full items-center rounded-md -px-2 py-2 text-sm`}
                                    >
                                        {conversation.is_admin && (
                                            <>
                                                <UserIcon className="w-4 h-4 mr-2" />
                                                Make Regular User
                                            </>
                                        )}
                                        {!conversation.is_admin && (
                                            <>
                                                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                                                Make Admin
                                            </>
                                        )}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}