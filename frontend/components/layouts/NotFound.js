import Link from "next/link";
import React from "react";
import Layout from "@/components/layouts/Layout";


const NotFound = () => {
    return (
        <Layout title="Page Not Found">
                <div className="page-not-found-wrapper">
                    <img src="/images/404.svg" height="550" width="550" alt="404_not_found" />

                    <h5>
                        Page Not Found. Go to <Link href="/">Homepage</Link>{" "}
                    </h5>
                </div>
        </Layout>

  );
};

export default NotFound;