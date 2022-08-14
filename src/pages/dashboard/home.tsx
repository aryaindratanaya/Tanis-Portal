import { NextPage } from 'next'
import { Card, Statistic, Row, Col, Tooltip } from 'antd'
import { Line } from '@ant-design/plots'
import { ticketGrowth } from 'data/ticketGrowth'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'

const Home: NextPage = () => {
  const DemoLine = () => {
    const config = {
      data: ticketGrowth,
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      xAxis: {
        type: 'time',
      },
      yAxis: {
        label: {
          formatter: (v: string) =>
            `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
    }

    return <Line {...config} />
  }
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
        <Card
          title="Tickets"
          extra={
            <Tooltip placement="topRight" title="Number of tickets sold today">
              <InfoCircleOutlined />
            </Tooltip>
          }
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic
                title="Foreigner"
                value={1823}
                valueStyle={{ color: '#3f8600' }}
                suffix={<ArrowUpOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Local"
                value={1053}
                valueStyle={{ color: '#cf1322' }}
                suffix={<ArrowDownOutlined />}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
        <Card
          title="Bookings"
          extra={
            <Tooltip placement="topRight" title="Number of bookings made today">
              <InfoCircleOutlined />
            </Tooltip>
          }
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic
                title="Single"
                value={1012}
                valueStyle={{ color: '#3f8600' }}
                suffix={<ArrowUpOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Group"
                value={1023}
                valueStyle={{ color: '#cf1322' }}
                suffix={<ArrowDownOutlined />}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
        <Card
          title="Sales Performance"
          extra={
            <Tooltip
              placement="topRight"
              title="Percentage of tickets sold via each sales channel today"
            >
              <InfoCircleOutlined />
            </Tooltip>
          }
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic
                title="Organics"
                value={11.1}
                valueStyle={{ color: '#3f8600' }}
                suffix="%"
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Agents"
                value={89.9}
                valueStyle={{ color: '#cf1322' }}
                suffix="%"
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
        <Card
          title="Delivery"
          extra={
            <Tooltip
              placement="topRight"
              title="Number of passengers transported using in-house boat or partner's boat"
            >
              <InfoCircleOutlined />
            </Tooltip>
          }
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic
                title="In-House"
                value={2034}
                valueStyle={{ color: '#3f8600' }}
                suffix={<ArrowUpOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic title="Transferred" value={0} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Card
          title="Tickets Sold Growth"
          extra={
            <Tooltip
              placement="topRight"
              title="Growth of tickets sold this month"
            >
              <InfoCircleOutlined />
            </Tooltip>
          }
        >
          <DemoLine />
        </Card>
      </Col>
    </Row>
  )
}

export default Home
