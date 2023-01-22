import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import JobContext from '@/context/JobContext'
import { toast } from 'react-toastify'
import { jobTypeOptions, educationOptions, experienceOptions, industryOptions } from './data'


export default function UpdateJob({job, access_token}) {

  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [salary, setSalary] = useState('')
  const [position, setPosition] = useState('')
  const [company, setCompany] = useState('')
  const [experience, setExperience] = useState('No Experience')
  const [industry, setIndustry] = useState('Business')
  const [education, setEducation] = useState('Bachelors')
  const [jobType, setJobType] = useState('Permanent')

  const { loading, error, clearErrors, setUpdated, updated, updateJob } = useContext(JobContext)
  const router = useRouter()

  useEffect(() => {

    if (job) {
        setDescription(job.description)
        setEmail(job.email)
        setTitle(job.title)
        setAddress(job.address)
        setSalary(job.salary)
        setPosition(job.position) 
        setCompany(job.company)
        setExperience(job.experience)
        setIndustry(job.industry)
        setEducation(job.education) 
        setJobType(job.jobType)
    }
    
    if (error) {
      toast.error(error)
      clearErrors()
    }
    if (updated) {
      setUpdated(false)
      toast.success("Job updated successfuly")
      router.push("/employeer/jobs")
    }
  }, [error, updated])

  const submitHandler = (e) => {
    e.preventDefault()

    const data = {
      description,
      email,
      title,
      address,
      salary,
      position,
      experience,
      industry,
      education,
      company,
      jobType,
    }
    updateJob(job.id, data, access_token)
  }
  
  return (
    <div className="newJobcontainer">
      <div className="formWrapper">
        <div className="headerWrapper">
          <div className="headerLogoWrapper"></div>
          <h1>
            <i aria-hidden className="fas fa-copy mr-2"></i> POST A JOB
          </h1>
        </div>
        <form className="form" onSubmit={submitHandler}>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fab fa-tumblr"></i>
                  <input
                    type="text"
                    placeholder="Enter Job Title"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value) }
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-file-medical-alt"></i>
                  <textarea
                    className="description"
                    type="text"
                    placeholder="Enter Job Description"
                    value={description}
                    onChange={e => setDescription(e.target.value) }
                    required
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    pattern="\S+@\S+\.\S+"
                    title="Your email is invalid"
                    value={email}
                    onChange={e => setEmail(e.target.value) }
                    required
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-map-marker-alt"></i>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={e => setAddress(e.target.value) }
                    required
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-dollar-sign"></i>
                  <input
                    type="number"
                    placeholder="Enter Salary Range"
                    value={salary}
                    onChange={e => setSalary(e.target.value) }
                    required
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-users"></i>
                  <input
                    type="number"
                    placeholder="Enter No. of Positions"
                    value={position}
                    onChange={e => setPosition(e.target.value) }
                    required
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-building"></i>
                  <input
                    type="text"
                    placeholder="Enter Company Name"
                    value={company}
                    onChange={e => setCompany(e.target.value) }
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 ml-4 mt-4 mt-md-0 ml-md-0">
              <div className="boxWrapper">
                <h4>Job Types:</h4>
                <div className="selectWrapper">
                  <select
                    className="classic"
                    value={jobType}
                    onChange={e => setJobType(e.target.value)}
                  >
                    {
                      jobTypeOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>

                      ))
                    }
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h4>Education:</h4>
                <div className="selectWrapper">
                  <select
                    className="classic"
                    value={education}
                    onChange={e => setEducation(e.target.value)}
                  >
                  {
                      educationOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h4>Industry:</h4>
                <div className="selectWrapper">
                  <select
                    className="classic"
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                  >
                   {
                      industryOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                       )
                      )
                    }
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h4>Experience:</h4>
                <div className="selectWrapper">
                  <select
                    className="classic"
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                  >
                  {
                      experienceOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>

            <div className="col text-center mt-3">
              <button className="createButton">
                { loading ? 'Updating...' : 'Update Job'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
