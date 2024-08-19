import { useEventBus } from "@/EventBus";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, LockClosedIcon, LockOpenIcon, ShieldCheckIcon, TrashIcon, UserIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Fragment } from "react";

export default function MessageOptionsDropdown({message}){
    const {emit} = useEventBus();
    const onMessageDelete = () => {
        axios
            .delete(route("message.destroy", message.id))
            .then((res) => {
                emit('message.deleted', {message, prevMessage: res.data.message});
            })
            .catch((err) => {
                console.error(err);
            })
    }
    
    return (
        <div className="absolute right-full text-gray-100 top-1/2 -translate-y-1/2 z-10">
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
                    <Menu.Items className="absolute left-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <button onClick={onMessageDelete}
                                        className={`${active ? "bg-black/30 text-white" : "text-gray-100"} 
                                        group flex w-full items-center rounded-md -px-2 py-2 text-sm`}
                                    >
                                        <TrashIcon className="w-4 h-4 mr-2"/>
                                        Delete 
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