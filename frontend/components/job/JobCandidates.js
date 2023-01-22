import Link from 'next/link';
import React from 'react'
import DataTable from 'react-data-table-component'


export default function JobCandidates({ candidatesApplied, error }) {
    const columns = [
        {
            name: "Job Name",
            sortable: true,
            selector: (row) => row.title
        },
        {
            name: "Candidate ID",
            sortable: true,
            selector: (row) => row.id
        },
        {
            name: "Candidate Resume",
            sortable: true,
            selector: (row) => row.canResume
        },
        {
            name: "Applied At",
            sortable: true,
            selector: (row) => row.appliedAt
        },

    ];

    const data = [];

    candidatesApplied?.forEach(cadidate => {
        data.push({
            title: cadidate.job.title,
            id: cadidate.user,
            appliedAt: cadidate.appliedAt.substring(0, 10),
            canResume: (
                <a href={`${process.env.API_URL}/${cadidate.resume}`}>
                    <a className='text-success' rel='noreferrer' target='_blank'>
                        <b>
                            <i aria-hidden className='fa fa-download'/>View Resume
                        </b>
                    </a>
                </a>
            )
        })
    })

  return (
      <div className='row'>
          <div className='col-2'></div>
              <div className='col-8 mt-5'>
              <h4 className='my-5'>{ candidatesApplied.length} Candidates Applied For This Job</h4>
                  <DataTable columns={columns} data={ data } pagination responsive/>
              </div>
          <div className='col-2'></div>
      </div>
  )
}
