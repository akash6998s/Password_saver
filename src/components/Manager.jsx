import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

function Manager() {

    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    const showPassword = () => {
        if (ref.current.src.includes('eye.png')) {
            ref.current.src = 'icons/eyecross.png';
            passwordRef.current.type = "text";
        } else {
            ref.current.src = 'icons/eye.png';
            passwordRef.current.type = "password";
        }
    };

    useEffect(() => {
        let passwords = localStorage.getItem('passwords');
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const savePassword = () => {
        const newEntry = {...form, id: uuidv4() }
        setPasswordArray([...passwordArray, newEntry]);
        localStorage.setItem('passwords', JSON.stringify([...passwordArray, newEntry]));
        toast.success('Password saved successfully!');
        setForm({site: "", username: "", password: ""})
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.info('Copied to clipboard!');
    };

    const deleteAllPassword = () => {
        localStorage.clear();
        setPasswordArray([]);
        toast.info('All passwords deleted successfully!');
    };
    

    const deletePassword = (id) => {
        setPasswordArray(passwordArray.filter(item => item.id !== id));
        localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => item.id !== id)));
        toast.info('Password delete successfully!');
    }

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find((item) => item.id === id);
        setForm(passwordToEdit);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };
    

    return (
        <>
            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
            </div>

            <div className="mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password Manager</p>

                <div className="text-black gap-8 flex flex-col p-4 items-center">
                    <input value={form.site} name='site' onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-gray-500 w-full p-4 py-1' type="text" />
                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} name='username' onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-gray-500 w-full p-4 py-1' type="text" />
                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} name='password' onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-gray-500 w-full p-4 py-1' type="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-500 rounded-full px-8 gap-2 border border-gray-600 py-2 w-fit'>
                        <lord-icon src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover">
                        </lord-icon>Save</button>
                </div>
                <div className="passwords overflow-x-auto p-6 bg-gray-50 rounded-lg shadow-lg">
                    <div className='flex justify-between items-center'>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Passwords</h2>
                        <button onClick={deleteAllPassword} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete All</button>
                    </div>
                    {passwordArray.length === 0 ? (
                        <div className="text-center text-gray-500">No passwords saved.</div>
                    ) : (
                        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                            <thead className="bg-green-200">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">Website</th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">Username</th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">Password</th>
                                    <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-gray-900 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {passwordArray.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <div className="flex items-center gap-2">
                                                <a href={item.site} target='_blank' className="hover:underline text-blue-600">{item.site}</a>
                                                <img className='w-5 cursor-pointer' src="icons/copy.png" alt="Copy icon" onClick={() => { copyText(item.site) }} title="Copy URL" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <div className="flex items-center gap-2">
                                                <span>{item.username}</span>
                                                <img className='w-5 cursor-pointer' src="icons/copy.png" alt="Copy icon" onClick={() => { copyText(item.username) }} title="Copy Username" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <div className="flex items-center gap-2">
                                                <span>{item.password}</span>
                                                <img className='w-5 cursor-pointer' src="icons/copy.png" alt="Copy icon" onClick={() => { copyText(item.password) }} title="Copy Password" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-4">
                                                <button
                                                    onClick={() => { editPassword(item.id) }}
                                                    type="button"
                                                    className="text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 transition-colors"
                                                >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/ylvuooxd.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}>
                                                    </lord-icon>
                                                </button>
                                                <button
                                                    onClick={() => { deletePassword(item.id) }}
                                                    type="button"
                                                    className="text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 transition-colors"
                                                >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}>
                                                    </lord-icon>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Manager;
