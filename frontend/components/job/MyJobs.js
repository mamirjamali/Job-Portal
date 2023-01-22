import React, { useEffect, useContext } from 'react'
import DataTable from 'react-data-table-component'
import JobContext from '@/context/JobContext'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export default function MyJobs({ jobs, access_token }) {
    const { error, clearErrors, deleted, setDeleted, deleteJob } = useContext(JobContext)
    
    const router = useRouter()

    useEffect(() => {
        if (error) {
            toast.error(error)
            clearErrors()
        }

        if (deleted) {
          setDeleted(false)
          toast.success("Item deleted successfuly")
          router.push(router.asPath)
        }
    }, [error, deleted])

    const deleteHandler = (id) => {
        deleteJob(id, access_token)
    }   

    const columns = [
        {
            name: "Job ID",
            sortable: true,
            selector: (row) => row.id
        },
        {
            name: "Job Title",
            sortable: true,
            selector: (row) => row.title
        },
        {
            name: "Salary",
            sortable: true,
            selector: (row) => row.salary
        },
        {
            name: "Experience",
            sortable: true,
            selector: (row) => row.experience
        },

        {
            name: "Action",
            sortable: true,
            selector: (row) => row.action
        },
    ];

    const data = [];

    jobs?.forEach(job => {
        data.push({
            id: job.id,
            title: job.title,
            salary: job.salary,
            education: job.education,
            experience: job.experience,
            action: (
                <>
                <a href={`/jobs/${job.id}`}>
                    <a className='btn btn-primary'>
                        <i aria-hidden className='fa fa-eye'></i>
                    </a>
                </a>
                <a href={`jobs/candidates/${job.id}`}>
                    <a className='btn btn-success'>
                        <i aria-hidden className='fa fa-user'></i>
                    </a>
                </a>
                <a href={`jobs/${job.id}`}>
                    <a className='btn btn-warning'>
                        <i aria-hidden className='fa fa-pencile'></i>
                    </a>
                </a>
                <button className='btn btn-danger' onClick={() => deleteHandler(job.id)}>
                        <i aria-hidden className='fa fa-trash'></i>
                </button>
                </>
            )
        })
    })

  return (
      <div className='row'>
          <div className='col-2'></div>
              <div className='col-8 mt-5'>
                  <h4 className='my-5'>My Jobs</h4>
                  <DataTable columns={columns} data={ data } pagination responsive/>
              </div>
          <div className='col-2'></div>
      </div>
  )
}
