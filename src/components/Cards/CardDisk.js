import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { PureComponent } from "react";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import API from "../API";
import { useState, useEffect } from "react";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CardDisk = () => {
  const [disk, setDisk] = useState({});

  const refreshDisk = () => {
    API.get("/health")
      .then((res) => {
        const disk_refresh = res["data"]["components"]["diskSpace"]["details"];
        setDisk(disk_refresh);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshDisk();
    }, 6000);
    return () => clearInterval(interval);
  });

  return (
    <Card
      sx={{
        width: 290,
        background: "#191c26",
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      }}
    >
      <CardContent>
        <PieChart width={240} height={200}>
          <Pie
            data={[
              {
                name: "Free disk space",
                value: disk["free"] / 1e9,
              },
              {
                name: "Total disk space",
                value: disk["total"] / 1e9,
              },
            ]}
            cx={120}
            cy={200}
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            startAngle={180}
            endAngle={0}
          >
            <Cell key="cell-free" fill={COLORS[2]} />
            <Cell key="cell-total" fill={COLORS[1]} />
          </Pie>
          <Tooltip />
        </PieChart>
        <Typography variant="h6" style={{ marginLeft: 55, color: "white" }}>
          Disk Usage(GB)
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardDisk;
