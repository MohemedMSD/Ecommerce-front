import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdCloseCircleOutline } from 'react-icons/io'
import Axios from "../../../assets/constants/axios/axios";
import { useStateContext } from "../../../context/StateContext";
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import Loading from "../../Loading";

const ProfileM = ({hundleClick, ProfilModal}) => {
    const {user, setUser} = useStateContext()

    const [isLoading, setIsLoading] = useState(false)

    const [Adress, setAdress] = useState(user.adress)
    const [ErrAdress, setErrAdress] = useState('')

    const [Patient, setPatient] = useState(user.patient || '')
    const [ErrPatient, setErrPatient] = useState('')

    const [name, setname] = useState(user.name)
    const [ErrName, setErrName] = useState('')

    const [email, setemail] = useState(user.email)
    const [ErrEmail, setErrEmail] = useState('')

    const [Password, setPassword] = useState('')
    const [ErrPassword, setErrPassword] = useState('')

    const [PasswordU, setPasswordU] = useState('')
    const [ErrPasswordU, setErrPasswordU] = useState('')

    const [Password_Confirmation, setPassword_Confirmation] = useState('')
    const [ErrPassword_Confirmation, setErrPassword_Confirmation] = useState('')

    const [CurrentPassword, setCurrentPassword] = useState('')
    const [ErrCurrentPassword, setErrCurrentPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfPassword, setShowConfPassword] = useState(false)
    const [showCurrPassword, setShowCurrPassword] = useState(false)

    const updateProfileInfo = async (action) => {

        let formData = new FormData();

        if (action === 'update name') {
            formData.append('name', name)
            formData.append('adress', Adress)
            formData.append('patient', Patient)
        }

        if (action === 'update email') {
            formData.append('email', email)
            formData.append('password', Password)
        }

        setIsLoading(true)
        toast.loading('Le traitement est en cours...')

        try {
            
            const res = await Axios.post('/update-information', formData)
            if (res.status === 200) {
                
                toast.dismiss()
                toast.success('les informations mise à jour avec succés')
                setUser({...res.data, token : user.token});
                setemail(res.data.email)
                setname(res.data.name)
                setPassword('')
                setErrName('')
                setErrEmail('')
                setErrPassword('')
                setIsLoading(false)

            }

        } catch (rej) {
            
            toast.dismiss()

            if (rej.response.status === 422) {
                setIsLoading(false)
                setErrName(rej.response.data.name)

                toast.error('Informations non complétées')

                if (rej.response.data.email ) {
                    setErrEmail(rej.response.data.email)
                }else{
                    setErrEmail('')
                }

                if (rej.response.data.password ) {
                    setErrPassword(rej.response.data.password)
                }else{
                    setErrPassword('')
                }
            }else{
                toast.success('Parfois mal, veuillez réessayer')
            }

        }

    }

    const updatePassword = async () => {
        setIsLoading(true)
        toast.loading('Le traitement est en cours...')

        try {
            
            const res = await Axios.post('/update-password', {
                current_password : CurrentPassword,
                password : PasswordU,
                password_confirmation : Password_Confirmation
            })

            if (res.status === 200) {

                toast.dismiss()
                toast.success('le mot de passe mise à jour avec succés')
                setPassword_Confirmation('')
                setErrPassword_Confirmation('')

                setCurrentPassword('')
                setErrCurrentPassword('')

                setPasswordU('')
                setErrPasswordU('')

                setIsLoading(false)
            }

        } catch (rej) {
            
            toast.dismiss()
            if (rej.response.status === 422) {
                
                toast.error('Informations non complétées')
                if (rej.response.data.password) {
                    setErrPasswordU(rej.response.data.password)
                }else{
                    setErrPasswordU('')
                }

                if (rej.response.data.current_password) {
                    setErrCurrentPassword(rej.response.data.current_password)
                }else{
                    setErrCurrentPassword('')
                }

                if (rej.response.data.password_confirmation) {
                    setErrPassword_Confirmation(rej.response.data.password_confirmation)
                }else{
                    setErrPassword_Confirmation('')
                }
                
                setIsLoading(false)

            }else{
                toast.success('Parfois mal, veuillez réessayer')
            }

        }

    }

  return (
    <div className={`fixed top-0 h-screen right-0 w-full flex justify-center items-center z-50`}>

        <div className='fixed top-0 right-0 z-30 w-full h-screen bg-slate-500 opacity-60' />

        <div className="bg-white relative w-[98%] sm:w-[70%] lg:w-[55%] z-50 rounded-lg">

            <div className="flex items-center justify-between text-primary_text p-3">
                <h1 className="text-[22px] sm:text-[26px] font-bold">Profile</h1>
                <button onClick={() => hundleClick(false)}><IoMdCloseCircleOutline fontSize={25}/></button>
            </div>

            <hr className="border-gray-600" />

            <div className="flex flex-col gap-3 p-2 sm:p-5 overflow-y-scroll h-[88vh] sm:h-[84vh] hide-scrollbar">
                {isLoading && <div className="z-50"><Loading/></div>}

                <div className="border border-gray-400 text-primary_text p-2 rounded-lg">
                    <h1 className="text-[18px] sm:text-[22px] font-bold">
                    Profile Information :
                    </h1>
                    <div className="flex text-primary_text flex-col gap-4 mt-3 p-2">
                        
                        <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <label className="w-full sm:w-1/4">Full Name</label>
                                <input
                                type="text"
                                onChange={(e) => setname(e.target.value)}
                                value={name}
                                className="border w-full sm:w-3/4 border-gray-400 rounded-lg py-2 px-3 focus:border-primary_text outline-none"
                                />
                            </div>
                            {ErrName !== '' && <p className="text-red-500 mt-2">{ErrName}</p>}
                        </div>

                        <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <label className="w-full sm:w-1/4">Adress</label>
                                <input
                                type="text"
                                onChange={(e) => setAdress(e.target.value)}
                                value={Adress}
                                className="border w-full sm:w-3/4 border-gray-400 rounded-lg py-2 px-3 focus:border-primary_text outline-none"
                                />
                            </div>
                            {ErrAdress !== '' && <p className="text-red-500 mt-2">{ErrAdress}</p>}
                        </div>

                        <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <label className="w-full sm:w-1/4">N° Patient</label>
                                <input
                                type="text"
                                onChange={(e) => setPatient(e.target.value)}
                                value={Patient}
                                className="border w-full sm:w-3/4 border-gray-400 rounded-lg py-2 px-3 focus:border-primary_text outline-none"
                                />
                            </div>
                            {ErrPatient !== '' && <p className="text-red-500 mt-2">{ErrPatient}</p>}
                        </div>

                        <button onClick={() => updateProfileInfo('update name')} className="p-2 mx-auto w-[20%] font-semibold bg-second text-white rounded-md">
                            Save
                        </button>
                    </div>
                </div>

                <div className="border border-gray-400 text-primary_text p-2 rounded-lg">
                    <h1 className="text-[18px] sm:text-[22px] font-bold">
                    Update Email:
                    </h1>
                    <div className="flex text-primary_text flex-col gap-4 mt-3 p-2">
                        <div className="flex flex-col">

                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <label className=" w-full sm:w-1/4">Email</label>
                                <input
                                type="text"
                                onChange={(e) => setemail(e.target.value)}
                                value={email}
                                className="border w-full sm:w-3/4 border-gray-400 rounded-lg py-2 px-3 focus:border-primary_text outline-none"
                                />
                            </div>
                            {ErrEmail !== '' && <p className="text-red-500 mt-2">{ErrEmail}</p>}
                        </div>

                        <div className="flex flex-col">

                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <label className=" w-full sm:w-1/4">Password</label>
                                <div className="w-full sm:w-3/4 relative">
                                    <input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={Password}
                                    className="border w-full border-gray-400 rounded-lg py-2 px-3 focus:border-primary_text outline-none"
                                    />
                                    {
                                        showPassword ? 
                                        <FaEyeSlash  onClick={() => setShowPassword(false)} className='right-2  top-[50%] -translate-y-[50%] absolute'/>
                                        :
                                        <FaEye onClick={() => setShowPassword(true)} className='right-2  top-[50%] -translate-y-[50%] absolute'/>
                                    }
                                </div>
                            </div>
                            {ErrPassword !== '' && <p className="text-red-500 mt-2">{ErrPassword}</p>}
                        </div>

                        <button onClick={() => updateProfileInfo('update email')} className="p-2 mx-auto w-[20%] font-semibold bg-second text-white rounded-md">
                            Save
                        </button>
                    </div>
                </div>

                <div className="border border-gray-400 text-primary_text p-2 rounded-lg">
                    <h1 className="text-[18px] sm:text-[22px] font-bold">
                    Modify Password :
                    </h1>
                    <div className="flex flex-col gap-4 mt-3 p-2">
                    <div className="flex flex-col">

                        <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <label className=" w-full sm:w-1/4">Current Password</label>
                            
                            <div className=" relative w-full sm:w-3/4">
                                
                            <input
                            value={CurrentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            type={showCurrPassword ? 'text' : 'password'}
                            className="border w-full border-gray-400 rounded-lg py-2 px-3 focus:border-primary_text outline-none"
                            />
                            {
                                showCurrPassword ? 
                                <FaEyeSlash  onClick={() => setShowCurrPassword(false)} className='right-2  top-[50%] -translate-y-[50%] absolute'/>
                                :
                                <FaEye onClick={() => setShowCurrPassword(true)} className='right-2  top-[50%] -translate-y-[50%] absolute'/>
                            }
                            </div>
                        </div>

                        {ErrCurrentPassword !== '' && <p className="text-red-500 mt-2">{ErrCurrentPassword}</p>}
                    </div>

                    <div className="flex flex-col">

                        <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <label className=" w-full sm:w-1/4">New Password</label>
                            <div className="w-full sm:w-3/4 relative">
                                <input
                                value={PasswordU}
                                type={showNewPassword ? 'text' : 'password'}
                                onChange={(e) => setPasswordU(e.target.value)}
                                className="border w-full border-gray-400 rounded-lg py-2 px-3 focus:border-primary_text outline-none"
                                />
                                {
                                    showNewPassword ? 
                                    <FaEyeSlash  onClick={() => setShowNewPassword(false)} className='right-2  top-[50%] -translate-y-[50%] absolute'/>
                                    :
                                    <FaEye onClick={() => setShowNewPassword(true)} className='right-2  top-[50%] -translate-y-[50%] absolute'/>
                                }
                            </div>
                        </div>
                        {ErrPasswordU !== '' && <p className="text-red-500 mt-2">{ErrPasswordU}</p>}
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <label className=" w-full sm:w-1/4">Confirme Password</label>
                            <div className="w-full sm:w-3/4 relative">
                                <input
                                value={Password_Confirmation}
                                onChange={(e) => setPassword_Confirmation(e.target.value)}
                                type={showConfPassword ? 'text' : 'password'}
                                className="border w-full border-gray-400 rounded-lg py-2 px-3 focus:border-primary_text outline-none"
                                />
                                {
                                    showConfPassword ? 
                                    <FaEyeSlash  onClick={() => setShowConfPassword(false)} className='right-2  top-[50%] -translate-y-[50%] absolute'/>
                                    :
                                    <FaEye onClick={() => setShowConfPassword(true)} className='right-2  top-[50%] -translate-y-[50%] absolute'/>
                                }
                            </div>
                        </div>
                        {ErrPassword_Confirmation !== '' && <p className="text-red-500 mt-2">{ErrPassword_Confirmation}</p>}
                    </div>

                    <button onClick={() => updatePassword()} className="p-2 mx-auto w-[20%] font-semibold bg-second text-white rounded-md">
                        Save
                    </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default ProfileM;
