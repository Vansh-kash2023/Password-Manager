import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    if (passwords) {
      setPasswordArray(passwords);
      console.log(passwords)
    }
  }
  

  useEffect(() => {
    getPasswords();
    
  }, []);

  const copyText = (text) => {
    toast('Copied to clipboard!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    navigator.clipboard.writeText(text)
}

const showPassword = () => {
    passwordRef.current.type = "text"
    console.log(ref.current.src)
    if (ref.current.src.includes("icons/eyecross.png")) {
        ref.current.src = "icons/eye.png"
        passwordRef.current.type = "password"
    }
    else {
        passwordRef.current.type = "text"
        ref.current.src = "icons/eyecross.png"
    }

}

const savePassword = async () => {
  if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      // If any such id exists in the db, delete it 
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

      // Otherwise clear the form and show toast
      setform({ site: "", username: "", password: "" })
      toast('Password saved!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
  }
  else {
      toast('Error: Password not saved!');
  }

}

const deletePassword = async (id) => {
    console.log("Deleting password with id ", id)
    let c = confirm("Do you really want to delete this password?")
    if (c) {
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true, 
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

}

const editPassword = (id) => {
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setPasswordArray(passwordArray.filter(item => item.id !== id))
}


const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
}

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />

      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 md:mycontainer min-h-[88.2vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            type="text"
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8">
            <input
              onChange={handleChange}
              value={form.username}
              type="text"
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                onChange={handleChange}
                value={form.password}
                ref={passwordRef}
                type="password"
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                name="password"
                id="password"
              />
              <span
                className="absolute right-2 top-[6px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  src="/icons/eye.png"
                  alt=""
                  className="filter invert h-5"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-4 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border border-white py-2 text-center">
                        <div className=" flex items-center justify-center gap-2">
                          <a href={item.site} target="_balnk">
                            {item.site}
                          </a>
                          <div className="lordicon" onClick={() => { copyText(item.site) }}>
                            <span className="material-symbols-outlined cursor-pointer lordicon text-lg">
                              copy_all
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {item.username}
                          <div className="lordicon" onClick={() => { copyText(item.username) }}>
                            <span className="material-symbols-outlined cursor-pointer lordicon text-lg">
                              copy_all
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white py-2 text-center">
                        <div className=" flex items-center justify-center gap-2">
                        <span>{"*".repeat(item.password.length)}</span>
                          <div className="lordicon" onClick={() => { copyText(item.password) }}>
                            <span className="material-symbols-outlined cursor-pointer lordicon text-lg">
                              copy_all
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white py-2 text-center">
                        <span className="cursor-pointer mx-1" onClick={() =>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            style={{ width: "25px", height: "25px" }}>
                          </lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1" onClick={() =>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            stroke="bold"
                            state="morph-trash-in"
                            colors="primary:#121331,secondary:#16c79e"
                            style={{width:"25px", height:"25px"}}>
                          </lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
