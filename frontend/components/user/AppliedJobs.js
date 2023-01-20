import Link from 'next/link';
import React from 'react'
import DataTable from 'react-data-table-component'


export default function AppliedJobs({ jobs }) {
    const columns = [
        {
            name: "Job Name",
            sortable: true,
            selector: (row) => row.title
        },
        {
            name: "Salary",
            sortable: true,
            selector: (row) => row.salary
        },
        {
            name: "Education",
            sortable: true,
            selector: (row) => row.education
        },
        {
            name: "Experience",
            sortable: true,
            selector: (row) => row.experience
        },
        {
            name: "Applied On",
            sortable: true,
            selector: (row) => row.appliedOn
        },
        {
            name: "Action",
            sortable: true,
            selector: (row) => row.action
        },
    ];

    const data = [];

    jobs?.forEach(item => {
        data.push({
            title: item.job.title,
            salary: item.job.salary,
            education: item.job.education,
            experience: item.job.experience,
            appliedOn: item.appliedAt.substring(0, 10),
            action: (
                <a href={`/jobs/${item.job.id}`}>
                    <a className='btn btn-primary'>
                        <i aria-hidden className='fa fa-eye'></i>
                    </a>
                </a>
            )
        })
    })

  return (
      <div className='row'>
          <div className='col-2'></div>
              <div className='col-8 mt-5'>
                  <h4 className='my-5'>Applied Jobs</h4>
                  <DataTable columns={columns} data={ data } pagination responsive/>
              </div>
          <div className='col-2'></div>
      </div>
  )
}
