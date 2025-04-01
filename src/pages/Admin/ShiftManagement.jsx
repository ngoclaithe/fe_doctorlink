import React, { useState, useEffect } from 'react';
import { caLamViecApi, caKhamBenhApi } from '../../services/apiShift';
import Layout from '../../components/layoutAdmin/Layout';
import { Table, Button, Modal, Form, DatePicker, Select, message, Spin, Tabs } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TabPane } = Tabs;
const { Option } = Select;

const ShiftManagement = () => {
    // State cho ca làm việc
    const [caLamViecs, setCaLamViecs] = useState([]);
    const [selectedCaLamViec, setSelectedCaLamViec] = useState(null);
    const [caLamViecModalVisible, setCaLamViecModalVisible] = useState(false);
    const [caLamViecForm] = Form.useForm();
    
    // State cho ca khám bệnh
    const [caKhamBenhs, setCaKhamBenhs] = useState([]);
    const [selectedCaKhamBenh, setSelectedCaKhamBenh] = useState(null);
    const [caKhamBenhModalVisible, setCaKhamBenhModalVisible] = useState(false);
    const [caKhamBenhForm] = Form.useForm();
    
    // State chung
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [doctorId, setDoctorId] = useState(1); // ID bác sĩ, có thể lấy từ context hoặc params
    const [sessionDate, setSessionDate] = useState(moment().format('YYYY-MM-DD'));
    
    // Định nghĩa trạng thái ca khám bệnh
    const sessionStatuses = [
        { value: 'PENDING', label: 'Chờ khám' },
        { value: 'IN_PROGRESS', label: 'Đang khám' },
        { value: 'COMPLETED', label: 'Đã hoàn thành' },
        { value: 'CANCELED', label: 'Đã hủy' }
    ];

    // Fetch ca làm việc
    const fetchCaLamViecs = async () => {
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

    // Fetch ca khám bệnh theo ca làm việc
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

    // Fetch ca khám bệnh theo bác sĩ và ngày
    const fetchCaKhamBenhsByDoctor = async () => {
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

    useEffect(() => {
        fetchCaLamViecs();
        fetchCaKhamBenhsByDoctor();
    }, [doctorId, sessionDate]);

    // Thêm ca làm việc mới
    const handleAddCaLamViec = () => {
        setSelectedCaLamViec(null);
        caLamViecForm.resetFields();
        setCaLamViecModalVisible(true);
    };

    // Chỉnh sửa ca làm việc
    const handleEditCaLamViec = (record) => {
        setSelectedCaLamViec(record);
        caLamViecForm.setFieldsValue({
            ...record,
            ngay_lam_viec: moment(record.ngay_lam_viec),
            gio_bat_dau: moment(record.gio_bat_dau, 'HH:mm'),
            gio_ket_thuc: moment(record.gio_ket_thuc, 'HH:mm')
        });
        setCaLamViecModalVisible(true);
    };

    // Xóa ca làm việc
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
                ngay_lam_viec: values.ngay_lam_viec.format('YYYY-MM-DD'),
                gio_bat_dau: values.gio_bat_dau.format('HH:mm'),
                gio_ket_thuc: values.gio_ket_thuc.format('HH:mm'),
                bac_si_id: doctorId
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

    // Chỉnh sửa ca khám bệnh
    const handleEditCaKhamBenh = (record) => {
        setSelectedCaKhamBenh(record);
        caKhamBenhForm.setFieldsValue({
            ...record,
            ngay_kham: moment(record.ngay_kham),
            gio_bat_dau: moment(record.gio_bat_dau, 'HH:mm'),
            gio_ket_thuc: moment(record.gio_ket_thuc, 'HH:mm')
        });
        setCaKhamBenhModalVisible(true);
    };

    // Lưu ca khám bệnh (cập nhật)
    const handleSaveCaKhamBenh = async () => {
        try {
            const values = await caKhamBenhForm.validateFields();
            const formattedValues = {
                ...values,
                ngay_kham: values.ngay_kham.format('YYYY-MM-DD'),
                gio_bat_dau: values.gio_bat_dau.format('HH:mm'),
                gio_ket_thuc: values.gio_ket_thuc.format('HH:mm')
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

    // Hiển thị ca khám bệnh của ca làm việc
    const handleViewCaKhamBenh = (caLamViecId) => {
        fetchCaKhamBenhs(caLamViecId);
    };

    // Cột cho bảng ca làm việc
    const caLamViecColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ngày làm việc',
            dataIndex: 'ngay_lam_viec',
            key: 'ngay_lam_viec',
            render: (text) => moment(text).format('DD/MM/YYYY')
        },
        {
            title: 'Giờ bắt đầu',
            dataIndex: 'gio_bat_dau',
            key: 'gio_bat_dau',
        },
        {
            title: 'Giờ kết thúc',
            dataIndex: 'gio_ket_thuc',
            key: 'gio_ket_thuc',
        },
        {
            title: 'Số lượng tối đa',
            dataIndex: 'so_luong_toi_da',
            key: 'so_luong_toi_da',
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

    // Cột cho bảng ca khám bệnh
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
            dataIndex: 'ngay_kham',
            key: 'ngay_kham',
            render: (text) => moment(text).format('DD/MM/YYYY')
        },
        {
            title: 'Giờ bắt đầu',
            dataIndex: 'gio_bat_dau',
            key: 'gio_bat_dau',
        },
        {
            title: 'Giờ kết thúc',
            dataIndex: 'gio_ket_thuc',
            key: 'gio_ket_thuc',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trang_thai',
            key: 'trang_thai',
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

    // Filter cho ngày
    const handleDateChange = (date) => {
        setSessionDate(date ? date.format('YYYY-MM-DD') : null);
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Quản lý Ca Làm Việc</h1>
                    <div className="flex items-center">
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
                        >
                            Thêm Ca Làm Việc
                        </Button>
                    </div>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Ca Làm Việc" key="1">
                        <Spin spinning={loading}>
                            <Table 
                                dataSource={caLamViecs} 
                                columns={caLamViecColumns} 
                                rowKey="id"
                                pagination={{ pageSize: 10 }}
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
                            />
                        </Spin>
                    </TabPane>
                </Tabs>

                {/* Modal cho Ca Làm Việc */}
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
                        <Form.Item
                            name="ngay_lam_viec"
                            label="Ngày làm việc"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày làm việc' }]}
                        >
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="gio_bat_dau"
                            label="Giờ bắt đầu"
                            rules={[{ required: true, message: 'Vui lòng nhập giờ bắt đầu' }]}
                        >
                            <DatePicker.TimePicker format="HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="gio_ket_thuc"
                            label="Giờ kết thúc"
                            rules={[{ required: true, message: 'Vui lòng nhập giờ kết thúc' }]}
                        >
                            <DatePicker.TimePicker format="HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="so_luong_toi_da"
                            label="Số lượng tối đa"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng tối đa' }]}
                        >
                            <input type="number" className="w-full p-2 border rounded" min={1} />
                        </Form.Item>
                        <Form.Item
                            name="ghi_chu"
                            label="Ghi chú"
                        >
                            <textarea className="w-full p-2 border rounded" rows={3} />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Modal cho Ca Khám Bệnh */}
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
                            name="ngay_kham"
                            label="Ngày khám"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày khám' }]}
                        >
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="gio_bat_dau"
                            label="Giờ bắt đầu"
                            rules={[{ required: true, message: 'Vui lòng nhập giờ bắt đầu' }]}
                        >
                            <DatePicker.TimePicker format="HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="gio_ket_thuc"
                            label="Giờ kết thúc"
                            rules={[{ required: true, message: 'Vui lòng nhập giờ kết thúc' }]}
                        >
                            <DatePicker.TimePicker format="HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="trang_thai"
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