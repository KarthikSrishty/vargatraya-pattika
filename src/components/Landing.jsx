import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
const Landing = () => {
    const [name, setname] = useState('');
    const [gothram, setgothram] = useState('');
    const [loading, setLoading] = useState(true);
    const [number, setnumber] = useState('');
    const [address, setAddress] = useState('');
    const [newData, setNewData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingPaymentId, setEditingPaymentId] = useState(null);
    const [paymentStatus, setpaymentStatus] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nanna-vargatrayapattika-be-production.up.railway.app/users');
                setNewData(response.data.users);
                setOriginalData(response.data.users);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        console.log(newData);
        fetchData();
    }, []);
    const togglePaymentStatus = async (id) => {
        try {
            await axios.put(`https://nanna-vargatrayapattika-be-production.up.railway.app/users/${id}/paymentstatus`, {
                paymentStatus
            });
            setNewData(prev =>
                prev.map(user =>
                    user._id === id ? { ...user, paymentStatus: paymentStatus } : user
                )
            );
            setEditingPaymentId(null);
        } catch (error) {
            console.error('Failed to update paymentStatus status:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://nanna-vargatrayapattika-be-production.up.railway.app/users/adduser', {
                name: name,
                gothram: gothram,
                number: number,
                address: address,
                paymentStatus: paymentStatus
            });
            console.log('User added successfully:', response.data);
            setNewData(prevData => [...prevData, response.data]);
            setOriginalData(prevData => [...prevData, response.data]);
            setname('');
            setgothram('');
            setnumber('');
            setAddress('');
            setShowForm(false);
        } catch (error) {
            alert(`Error adding user: ${error.response.data.message}`);
        }
    };
    const handleEditDetails = (userid) => {
        navigate(`/addform/${userid}`);
    }
    const handleViewDetails = (userid) => {
        navigate(`/print/${userid}`);
    }
    const handleSearch = (q) => {
        if (q === '') {
            setNewData(originalData);
        } else {
            const filteredData = originalData.filter(data =>
                data.number.toString().includes(q)
            );
            setNewData(filteredData);
        }
        setSearchQuery(q);
    };
    const handleTeluguKeyPress = (value, setter) => async (e) => {
        if (e.key === ' ' && value.trim() !== '') {
            try {
                const response = await axios.get(
                    `https://inputtools.google.com/request?text=${value}&itc=te-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
                );
                const firstTeluguWord =
                    response.data[1][0][1].length > 0 ? response.data[1][0][1][0] : '';
                setter(firstTeluguWord + ' ');
            } catch (error) {
                console.error('Error fetching Telugu word:', error);
            }
        }
    };
    
    const handleFillDetails = (data) => {
        navigate(`/addform/${data._id}`);
    };
    return (
        <div className="bg-white rounded-md min-h-screen m-3 p-2">
            <div className="flex justify-between">
                <img src='/namaste.jpg' className="rounded-md h-40 w-24" alt="Namaste" />
                <img src='/nanna.jpg' className="mr-2 mt-10 h-20" alt="Nanna" />
            </div>
            <Divider>
                <img src='/Omm.ico' className="w-20 h-auto" alt="Om" />
            </Divider>
            <div>
                <div className='flex justify-between w-full items-center p-2'>
                    <div className="text-4xl text-left text-orange-800">
                        యజమానుల వివరాలు
                    </div>
                    <div className='text-right'>
                        <TextField
                            label="Search by Phone Number"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            variant="outlined"
                        />
                    </div>
                </div>
            </div>
            {loading ? ( // Conditionally rendering loading animation
                <div className="flex justify-center mt-8">
                    <CircularProgress color="primary" />
                </div>
            ) : (
                // Your existing JSX
                <div className="bg-white rounded-md border border-gray-300 p-4 mt-4 overflow-x-auto max-h-[50vh]">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-200 text-left text-lg font-semibold text-gray-800 uppercase tracking-wider rounded-l-lg">#</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-lg font-semibold text-gray-800 uppercase tracking-wider">యజమాని పేరు</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-lg font-semibold text-gray-800 uppercase tracking-wider">యజమాని గోత్రం</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-lg font-semibold text-gray-800 uppercase tracking-wider">ఫోన్ నెంబర్</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-lg font-semibold text-gray-800 uppercase tracking-wider">అడ్రస్</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-lg font-semibold text-gray-800 tracking-wider">Payment Status</th>
                                <th className="px-6 py-3 bg-gray-200 rounded-r-lg"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {newData.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg">{data.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg">{data.gothram}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg">{data.number}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg">{data.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                                        {editingPaymentId === data._id ? (
                                            <input
                                                type="text"
                                                value={paymentStatus}
                                                onChange={(e) => setpaymentStatus(e.target.value)}
                                                onKeyPress={handleTeluguKeyPress(paymentStatus,setpaymentStatus)}
                                                onBlur={() => togglePaymentStatus(data._id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') togglePaymentStatus(data._id);
                                                }}
                                                className="border p-1 rounded w-24"
                                                autoFocus
                                            />
                                        ) : (
                                            <div
                                                className="cursor-pointer font-semibold underline"
                                                onDoubleClick={() => {
                                                    setEditingPaymentId(data._id);
                                                    setpaymentStatus(data.paymentStatus);
                                                }}
                                            >
                                                {data.paymentStatus}
                                            </div>
                                        )}
                                    </td>


                                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                                        {data.data.length !== 0 ? (
                                            <>
                                                <button
                                                    className="bg-blue-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                                                    onClick={() => handleViewDetails(data._id)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="bg-red-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-red-600"
                                                    onClick={() => handleEditDetails(data._id)}
                                                >
                                                    Edit
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="bg-orange-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-orange-600"
                                                onClick={() => handleFillDetails(data)}
                                            >
                                                Fill Details
                                            </button>
                                        )}

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div>
                <div className="mt-4 flex justify-center">
                    <Button variant="contained" onClick={() => setShowForm(true)}>
                        Add New
                    </Button>
                </div>
            </div>
            <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Form Details</DialogTitle>
                <DialogContent dividers>
                    <div className="space-y-4">
                        <TextField
                            label="యజమాని పేరు"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            onKeyPress={handleTeluguKeyPress(name,setname)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <div className="flex gap-4">
                            <TextField
                                label="యజమాని గోత్రం"
                                value={gothram}
                                onChange={(e) => setgothram(e.target.value)}
                                onKeyPress={handleTeluguKeyPress(gothram,setgothram)}
                                variant="outlined"
                                className="flex-grow"
                            />
                            <TextField
                                label="ఫోన్ నెంబర్"
                                value={number}
                                onChange={(e) => setnumber(e.target.value)}
                                variant="outlined"
                                className="w-48"
                            />
                        </div>
                        <TextField
                            label="అడ్రస్"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            onKeyPress={handleTeluguKeyPress(address,setAddress)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Payment Status"
                            value={paymentStatus}
                            onChange={(e) => setpaymentStatus(e.target.value)}
                            onKeyPress={handleTeluguKeyPress(paymentStatus,setpaymentStatus)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowForm(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Landing;
