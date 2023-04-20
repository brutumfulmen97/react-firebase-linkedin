import React from "react";
import { Space, Spin } from "antd";

export const Loader = () => {
    return (
        <div className="loader">
            <p>Loading...</p>
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>
    );
};
