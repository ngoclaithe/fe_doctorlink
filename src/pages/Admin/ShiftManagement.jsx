import React, { useState, useEffect } from 'react';
import { caLamViecApi, caKhamBenhApi } from '../../services/apiShift';
import { getDoctor } from '../../services/apiDoctor';
import Layout from '../../components/layoutAdmin/Layout';
import { Table, Button, Modal, Form, DatePicker, Select, message, Spin, Tabs } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TabPane } = Tabs;
const { Option } = Select;

const ShiftManagement = () => {
    const [caLamViecs, setCaLamViecs] = useState([]);
    const [selectedCaLamViec, setSelectedCaLamViec] = useState(null);
    const [caLamViecModalVisible, setCaLamViecModalVisible] = useState(false);
    const [caLamViecForm] = Form.useForm();
    
    const [caKhamBenhs, setCaKhamBenhs] = useState([]);
    const [selectedCaKhamBenh, setSelectedCaKhamBenh] = useState(null);
    const [caKhamBenhModalVisible, setCaKhamBenhModalVisible] = useState(false);
    const [caKhamBenhForm] = Form.useForm();
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [doctorId, setDoctorId] = useState(null);
    const [sessionDate, setSessionDate] = useState(moment().format('YYYY-MM-DD'));
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    
    const serviceTypes = [
        { value: 'kham_tai_nha', label: 'Khám tại nhà' },
        { value: 'tu_van_online', label: 'Tư vấn online' }
    ];
    
    const sessionStatuses = [
        { value: 'available', label: 'Có sẵn' },
        { value: 'booked', label: 'Đã đặt' },
        { value: 'cancelled', label: 'Đã hủy' }
    ];

    // Fetch all doctors
    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const data = await getDoctor();
            setDoctors(data);
            
            // If this is initial load and we don't have a doctorId selected, 
            // set the first doctor as default if available
            if (!doctorId && data.length > 0) {
                setDoctorId(data[0].user_id);
                setSelectedDoctor(data[0]);
            }
        } catch (err) {
            console.error("Lỗi khi lấy danh sách bác sĩ:", err);
            message.error("Không thể tải danh sách bác sĩ");
        } finally {
            setLoading(false);
        }
    };

    const fetchCaLamViecs = async () => {
        if (!doctorId) return;
        
        try {
            setLoading(true);
            const data = await caLamViecApi.getByDoctor(doctorId, sessionDate);
            setCaLamViecs(data);
            setError(null);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách ca làm việc:", err);
            setError("Không thể tải danh sách ca làm việc");
            message.error("Không thể tải danh sách ca làm việc");
        } finally {
            setLoading(false);
        }
    };

    const fetchCaKhamBenhs = async (caLamViecId) => {
        try {
            setLoading(true);
            const data = await caLamViecApi.getCaKhamBenh(caLamViecId);
            setCaKhamBenhs(data);
            setError(null);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách ca khám bệnh:", err);
            setError("Không thể tải danh sách ca khám bệnh");
            message.error("Không thể tải danh sách ca khám bệnh");
        } finally {
            setLoading(false);
        }
    };

    const fetchCaKhamBenhsByDoctor = async () => {
        if (!doctorId) return;
        
        try {
            setLoading(true);
            const data = await caKhamBenhApi.getByDoctor(doctorId, sessionDate);
            setCaKhamBenhs(data);
            setError(null);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách ca khám bệnh theo bác sĩ:", err);
            setError("Không thể tải danh sách ca khám bệnh");
            message.error("Không thể tải danh sách ca khám bệnh");
        } finally {
            setLoading(false);
        }
    };

    // Initial data loading
    useEffect(() => {
        fetchDoctors();
    }, []);

    // Effect to load data when doctorId or sessionDate changes
    useEffect(() => {
        if (doctorId) {
            fetchCaLamViecs();
            fetchCaKhamBenhsByDoctor();
            
            // Find selected doctor from doctors array based on doctorId
            const doctor = doctors.find(doc => doc.user_id === doctorId);
            if (doctor) {
                setSelectedDoctor(doctor);
            }
        }
    }, [doctorId, sessionDate, doctors]);

    const handleDoctorChange = (value) => {
        setDoctorId(value);
    };

    const handleAddCaLamViec = () => {
        if (!doctorId) {
            message.warning("Vui lòng chọn bác sĩ trước khi thêm ca làm việc");
            return;
        }
        
        setSelectedCaLamViec(null);
        caLamViecForm.resetFields();
        caLamViecForm.setFieldsValue({
            session_date: moment(sessionDate),
            doctor_id: doctorId
        });
        setCaLamViecModalVisible(true);
    };

    const handleEditCaLamViec = (record) => {
        setSelectedCaLamViec(record);
        caLamViecForm.setFieldsValue({
            ...record,
            session_date: moment(record.session_date),
            start_time: moment(record.start_time, 'HH:mm'),
            end_time: moment(record.end_time, 'HH:mm'),
            service_type: record.service_type,
            doctor_id: record.doctor_id || doctorId
        });
        setCaLamViecModalVisible(true);
    };

    const handleDeleteCaLamViec = async (id) => {
        try {
            await caLamViecApi.delete(id);
            message.success("Xóa ca làm việc thành công");
            fetchCaLamViecs();
        } catch (err) {
            console.error("Lỗi khi xóa ca làm việc:", err);
            message.error("Không thể xóa ca làm việc");
        }
    };

    // Lưu ca làm việc (tạo mới hoặc cập nhật)
    const handleSaveCaLamViec = async () => {
        try {
            const values = await caLamViecForm.validateFields();
            const formattedValues = {
                ...values,
                session_date: values.session_date.format('YYYY-MM-DD'),
                start_time: values.start_time.format('HH:mm'),
                end_time: values.end_time.format('HH:mm'),
                doctor_id: values.doctor_id || doctorId
            };

            if (selectedCaLamViec) {
                await caLamViecApi.update(selectedCaLamViec.id, formattedValues);
                message.success("Cập nhật ca làm việc thành công");
            } else {
                await caLamViecApi.create(formattedValues);
                message.success("Tạo ca làm việc thành công");
            }
            
            setCaLamViecModalVisible(false);
            fetchCaLamViecs();
        } catch (err) {
            console.error("Lỗi khi lưu ca làm việc:", err);
            message.error("Không thể lưu ca làm việc");
        }
    };

    const handleEditCaKhamBenh = (record) => {
        setSelectedCaKhamBenh(record);
        caKhamBenhForm.setFieldsValue({
            ...record,
            session_date: moment(record.session_date),
            start_time: moment(record.start_time, 'HH:mm'),
            end_time: moment(record.end_time, 'HH:mm'),
            service_type: record.service_type,
            status: record.status
        });
        setCaKhamBenhModalVisible(true);
    };

    const handleSaveCaKhamBenh = async () => {
        try {
            const values = await caKhamBenhForm.validateFields();
            const formattedValues = {
                ...values,
                session_date: values.session_date.format('YYYY-MM-DD'),
                start_time: values.start_time.format('HH:mm'),
                end_time: values.end_time.format('HH:mm')
            };

            await caKhamBenhApi.update(selectedCaKhamBenh.id, formattedValues);
            message.success("Cập nhật ca khám bệnh thành công");
            setCaKhamBenhModalVisible(false);
            fetchCaKhamBenhsByDoctor();
        } catch (err) {
            console.error("Lỗi khi lưu ca khám bệnh:", err);
            message.error("Không thể lưu ca khám bệnh");
        }
    };

    const handleViewCaKhamBenh = (caLamViecId) => {
        fetchCaKhamBenhs(caLamViecId);
    };

    const caLamViecColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ngày làm việc',
            dataIndex: 'session_date',
            key: 'session_date',
            render: (text) => moment(text).format('DD/MM/YYYY')
        },
        {
            title: 'Giờ bắt đầu',
            dataIndex: 'start_time',
            key: 'start_time',
        },
        {
            title: 'Giờ kết thúc',
            dataIndex: 'end_time',
            key: 'end_time',
        },
        {
            title: 'Loại dịch vụ',
            dataIndex: 'service_type',
            key: 'service_type',
            render: (type) => {
                const serviceType = serviceTypes.find(s => s.value === type);
                return serviceType ? serviceType.label : type;
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button 
                        icon={<EyeOutlined />} 
                        onClick={() => handleViewCaKhamBenh(record.id)}
                        style={{ marginRight: 8 }}
                    />
                    <Button 
                        icon={<EditOutlined />} 
                        onClick={() => handleEditCaLamViec(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Button 
                        icon={<DeleteOutlined />} 
                        danger
                        onClick={() => handleDeleteCaLamViec(record.id)}
                    />
                </>
            ),
        },
    ];

    const caKhamBenhColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Bệnh nhân',
            dataIndex: 'ten_benh_nhan',
            key: 'ten_benh_nhan',
        },
        {
            title: 'Ngày khám',
            dataIndex: 'session_date',
            key: 'session_date',
            render: (text) => moment(text).format('DD/MM/YYYY')
        },
        {
            title: 'Giờ bắt đầu',
            dataIndex: 'start_time',
            key: 'start_time',
        },
        {
            title: 'Giờ kết thúc',
            dataIndex: 'end_time',
            key: 'end_time',
        },
        {
            title: 'Loại dịch vụ',
            dataIndex: 'service_type',
            key: 'service_type',
            render: (type) => {
                const serviceType = serviceTypes.find(s => s.value === type);
                return serviceType ? serviceType.label : type;
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const statusObj = sessionStatuses.find(s => s.value === status);
                return statusObj ? statusObj.label : status;
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Button 
                    icon={<EditOutlined />} 
                    onClick={() => handleEditCaKhamBenh(record)}
                />
            ),
        },
    ];

    const handleDateChange = (date) => {
        setSessionDate(date ? date.format('YYYY-MM-DD') : null);
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Quản lý Ca Làm Việc</h1>
                    <div className="flex items-center">
                        {/* Doctor selector */}
                        <Select
                            placeholder="Chọn bác sĩ"
                            style={{ width: 200, marginRight: 16 }}
                            onChange={handleDoctorChange}
                            value={doctorId}
                            loading={loading && !doctors.length}
                        >
                            {doctors.map(doctor => (
                                <Option key={doctor.user_id} value={doctor.user_id}>
                                    {doctor.full_name || `Bác sĩ #${doctor.user_id}`}
                                </Option>
                            ))}
                        </Select>
                        
                        <DatePicker 
                            onChange={handleDateChange} 
                            defaultValue={moment(sessionDate)}
                            format="DD/MM/YYYY"
                            style={{ marginRight: 16 }}
                        />
                        <Button 
                            type="primary" 
                            icon={<PlusOutlined />} 
                            onClick={handleAddCaLamViec}
                            disabled={!doctorId}
                        >
                            Thêm Ca Làm Việc
                        </Button>
                    </div>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}
                
                {selectedDoctor && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <h2 className="text-lg font-semibold">Thông tin bác sĩ</h2>
                        <div className="flex mt-2">
                            <div className="mr-4">
                                <p><strong>Họ tên:</strong> {selectedDoctor.full_name}</p>
                                <p><strong>Chuyên khoa:</strong> {selectedDoctor.specialty_id}</p>
                            </div>
                            <div>
                                <p><strong>Email:</strong> {selectedDoctor.email || 'Chưa cập nhật'}</p>
                                <p><strong>Số điện thoại:</strong> {selectedDoctor.phone}</p>
                            </div>
                        </div>
                    </div>
                )}

                {!doctorId && (
                    <div className="text-center p-8">
                        <p className="text-lg text-gray-500">Vui lòng chọn bác sĩ để xem ca làm việc và ca khám bệnh</p>
                    </div>
                )}

                {doctorId && (
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Ca Làm Việc" key="1">
                            <Spin spinning={loading}>
                                <Table 
                                    dataSource={caLamViecs} 
                                    columns={caLamViecColumns} 
                                    rowKey="id"
                                    pagination={{ pageSize: 10 }}
                                    locale={{ emptyText: 'Không có ca làm việc nào' }}
                                />
                            </Spin>
                        </TabPane>
                        <TabPane tab="Ca Khám Bệnh" key="2">
                            <Spin spinning={loading}>
                                <Table 
                                    dataSource={caKhamBenhs} 
                                    columns={caKhamBenhColumns} 
                                    rowKey="id"
                                    pagination={{ pageSize: 10 }}
                                    locale={{ emptyText: 'Không có ca khám bệnh nào' }}
                                />
                            </Spin>
                        </TabPane>
                    </Tabs>
                )}

                <Modal
                    title={selectedCaLamViec ? "Chỉnh sửa Ca Làm Việc" : "Thêm Ca Làm Việc"}
                    visible={caLamViecModalVisible}
                    onOk={handleSaveCaLamViec}
                    onCancel={() => setCaLamViecModalVisible(false)}
                    okText="Lưu"
                    cancelText="Hủy"
                >
                    <Form
                        form={caLamViecForm}
                        layout="vertical"
                    >
                        {/* Hidden field for doctor_id */}
                        <Form.Item
                            name="doctor_id"
                            hidden
                        >
                            <input type="hidden" />
                        </Form.Item>
                        
                        <Form.Item
                            name="session_date"
                            label="Ngày làm việc"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày làm việc' }]}
                        >
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="start_time"
                            label="Giờ bắt đầu"
                            rules={[{ required: true, message: 'Vui lòng nhập giờ bắt đầu' }]}
                        >
                            <DatePicker.TimePicker format="HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="end_time"
                            label="Giờ kết thúc"
                            rules={[{ required: true, message: 'Vui lòng nhập giờ kết thúc' }]}
                        >
                            <DatePicker.TimePicker format="HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="service_type"
                            label="Loại dịch vụ"
                            rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ' }]}
                        >
                            <Select>
                                {serviceTypes.map(type => (
                                    <Option key={type.value} value={type.value}>
                                        {type.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="ghi_chu"
                            label="Ghi chú"
                        >
                            <textarea className="w-full p-2 border rounded" rows={3} />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa Ca Khám Bệnh"
                    visible={caKhamBenhModalVisible}
                    onOk={handleSaveCaKhamBenh}
                    onCancel={() => setCaKhamBenhModalVisible(false)}
                    okText="Lưu"
                    cancelText="Hủy"
                >
                    <Form
                        form={caKhamBenhForm}
                        layout="vertical"
                    >
                        <Form.Item
                            name="session_date"
                            label="Ngày khám"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày khám' }]}
                        >
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="start_time"
                            label="Giờ bắt đầu"
                            rules={[{ required: true, message: 'Vui lòng nhập giờ bắt đầu' }]}
                        >
                            <DatePicker.TimePicker format="HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="end_time"
                            label="Giờ kết thúc"
                            rules={[{ required: true, message: 'Vui lòng nhập giờ kết thúc' }]}
                        >
                            <DatePicker.TimePicker format="HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="service_type"
                            label="Loại dịch vụ"
                            rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ' }]}
                        >
                            <Select disabled>
                                {serviceTypes.map(type => (
                                    <Option key={type.value} value={type.value}>
                                        {type.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="Trạng thái"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                        >
                            <Select>
                                {sessionStatuses.map(status => (
                                    <Option key={status.value} value={status.value}>
                                        {status.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="ghi_chu"
                            label="Ghi chú"
                        >
                            <textarea className="w-full p-2 border rounded" rows={3} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Layout>
    );
};

export default ShiftManagement;