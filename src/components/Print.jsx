import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Print = () => {
    const navigate = useNavigate();
    const { userid } = useParams();
    const [user, setUser] = useState({});
    const handleDownload = () => {
        window.print();
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://nanna-vargatrayapattika-be-production.up.railway.app/users/getuser/${userid}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUser();
    }, [userid]);

    return (
        <>
            <div className="bg-white flex flex-col rounded-t-md min-h-screen p-2">
                <div className='flex-grow'>
                    <div className="flex justify-between">
                        <div className="flex">
                            <img src='/namaste.jpg' className="rounded-md h-40 w-24" alt="Namaste" />
                            <div className="flex flex-col pt-8 pl-4">
                                <p className="text-2xl font-semibold text-orange-800 font-roboto">{user.name}</p>
                                <p className="text-lg text-gray-500">{user.gothram}</p>
                                <p className="text-lg text-gray-500">{user.number}</p>
                                <p className="text-lg text-gray-500">{user.address}</p>
                            </div>
                        </div>
                        <img src='/nanna.jpg' className="mr-2 mt-10 h-20" alt="Nanna" />
                    </div>
                    <Divider>
                        <img src='/Omm.ico' className="w-20 h-auto" alt="Om" />
                    </Divider>
                    <div className="text-4xl text-center text-orange-800 p-4">
                        వర్గత్రయ పట్టిక
                    </div>
                    <div>
                        <div className="flex items-center justify-end pr-2">
                            <svg onClick={handleDownload} style={{ cursor: 'pointer' }} className="h-8 w-8 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </div>

                        <table className="w-full table-auto bg-white border border-gray-200 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-1 py-2 border-b border-gray-200 w-0">Sl.No</th>
                                    <th className="px-4 py-2 border-b border-gray-200 ">వర్గ త్రయం</th>
                                    <th className="px-4 py-2 border-b border-gray-200 ">గోత్రం</th>
                                    <th className="px-4 py-2 border-b border-gray-200">పేరు</th>
                                    <th className="px-2 py-2 border-b border-gray-200">రూపం</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.data && user.data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-1 py-2 border-b border-gray-200 w-0">{index + 1}</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{item.vargatrayam}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 ">{item.gothramFirstName+" "+item.gothramLastName}</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{item.nameFirstName+" "+item.nameLastName}</td>
                                        <td className="px-2 py-2 border-b border-gray-200">{item.rupam}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </div>
                    <div className="flex justify-center pt-4">
                        <button className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-semibold py-2 px-4 rounded" onClick={() => navigate('/home')}>
                            Go Back To List
                        </button>
                    </div>
                </div>
                <footer className="text-center text-gray-600 bg-gray-200 mt-2">
                    <Divider>
                        <img src='/Omm.ico' className="w-20 h-auto" alt="Om" />
                    </Divider>
                    <p>Follow us on YouTube @hindupoojari24</p>
                    <p>Check our website <a href="http://hindupoojari.com/" className="text-blue-500">hindupoojari.com</a></p>
                    <p>Srishty Phani Sarma</p>
                    <p>9603280769</p>
                    <br />
                </footer>
            </div>
        </>
    );
};

export default Print;
