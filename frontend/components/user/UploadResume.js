import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import Link from "next/link";


const UploadResume = ({ access_token }) => {
    const [resume, setResume] = useState(null)

    const { loading, uploaded, error, user, clearErrors, setUploaded, uploadResume } = useContext(AuthContext)

  

    useEffect(() => {
        if (error) {
            toast.error(error)
            clearErrors()
        }
        if (uploaded) {
          setUploaded(false)
          toast.success("Your resume uploaded.")
        }
    }, [error, uploaded])

    //Submit Handler
    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("resume", resume)

        uploadResume(formData, access_token)
        
    }

    const onChangeHandler = (e) => {
      setResume(e.target.files[0])
    }
  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/resume-upload.svg" alt="resume" fill/>
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h3> UPLOAD RESUME </h3>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-upload"></i>
                  <input
                    type="file"
                    name="resume"
                    id="customFile"
                    accept="application/pdf"
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>
              {
                user && user.resume &&
              (
              <>
                <h4 className="text-center my-3">OR</h4>

                <a href={`${process.env.API_URL}/${user.resume}`}>
                  <a
                    className="text-success text-center ml-4"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <b>
                      <i aria-hidden className="fas fa-download"></i> Download
                      Your Resume
                    </b>
                  </a>
                </a>
              </>
              )
              }

              <div className="uploadButtonWrapper">
                <button type="submit" className="uploadButton">
                    {
                      loading ? 'Uploadign...' : 'Upload'                  
                    }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
