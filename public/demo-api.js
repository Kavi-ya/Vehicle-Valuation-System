/**
 * AW Associates — Demo API Interceptor
 * Intercepts all fetch() calls to localhost:8080 and returns realistic mock data.
 */

(function () {
  const DEMO_TOKEN = 'demo-jwt-token-aw-associates-2025';

  const MOCK_OPTIONS = [
    { id: 1, option_type: 'Finance Company', value: '1', label: 'Commercial Bank of Ceylon', sort_order: 1 },
    { id: 2, option_type: 'Finance Company', value: '2', label: 'People\'s Leasing & Finance', sort_order: 2 },
    { id: 3, option_type: 'Finance Company', value: '3', label: 'CDB Finance', sort_order: 3 },
    { id: 4, option_type: 'Finance Company', value: '4', label: 'Amana Bank', sort_order: 4 },
    { id: 5, option_type: 'Finance Company', value: '5', label: 'Sampath Bank', sort_order: 5 },
    { id: 10, option_type: 'Finance Branch', value: '10', label: 'Monaragala', sort_order: 1 },
    { id: 11, option_type: 'Finance Branch', value: '11', label: 'Badulla', sort_order: 2 },
    { id: 12, option_type: 'Finance Branch', value: '12', label: 'Bandarawela', sort_order: 3 },
    { id: 13, option_type: 'Finance Branch', value: '13', label: 'Kandy', sort_order: 4 },
    { id: 20, option_type: 'Make Details', value: 'Toyota', label: 'Toyota', sort_order: 1 },
    { id: 21, option_type: 'Make Details', value: 'Honda', label: 'Honda', sort_order: 2 },
    { id: 22, option_type: 'Make Details', value: 'Nissan', label: 'Nissan', sort_order: 3 },
    { id: 23, option_type: 'Make Details', value: 'Mitsubishi', label: 'Mitsubishi', sort_order: 4 },
    { id: 24, option_type: 'Make Details', value: 'Suzuki', label: 'Suzuki', sort_order: 5 },
    { id: 25, option_type: 'Make Details', value: 'Isuzu', label: 'Isuzu', sort_order: 6 },
    { id: 26, option_type: 'Make Details', value: 'Tata', label: 'Tata', sort_order: 7 },
    { id: 30, option_type: 'Fuel Types', value: 'Petrol', label: 'Petrol', sort_order: 1 },
    { id: 31, option_type: 'Fuel Types', value: 'Diesel', label: 'Diesel', sort_order: 2 },
    { id: 32, option_type: 'Fuel Types', value: 'Hybrid', label: 'Hybrid', sort_order: 3 },
    { id: 33, option_type: 'Fuel Types', value: 'Electric', label: 'Electric', sort_order: 4 },
    { id: 40, option_type: 'Body Color', value: 'White', label: 'White', sort_order: 1 },
    { id: 41, option_type: 'Body Color', value: 'Black', label: 'Black', sort_order: 2 },
    { id: 42, option_type: 'Body Color', value: 'Silver', label: 'Silver', sort_order: 3 },
    { id: 43, option_type: 'Body Color', value: 'Blue', label: 'Blue', sort_order: 4 },
    { id: 44, option_type: 'Body Color', value: 'Red', label: 'Red', sort_order: 5 },
    { id: 50, option_type: 'Countries', value: 'Japan', label: 'Japan', sort_order: 1 },
    { id: 51, option_type: 'Countries', value: 'India', label: 'India', sort_order: 2 },
    { id: 52, option_type: 'Countries', value: 'UK', label: 'United Kingdom', sort_order: 3 },
    { id: 53, option_type: 'Countries', value: 'Germany', label: 'Germany', sort_order: 4 },
    { id: 60, option_type: 'Opinion provider', value: 'AW Associates Monaragala', label: 'AW Associates Monaragala', sort_order: 1 },
    { id: 61, option_type: 'Opinion provider', value: 'AW Associates Badulla', label: 'AW Associates Badulla', sort_order: 2 },
    { id: 70, option_type: 'Inspectors', value: 'K. Prasanna', label: 'K. Prasanna', sort_order: 1 },
    { id: 71, option_type: 'Inspectors', value: 'R. Bandara', label: 'R. Bandara', sort_order: 2 },
    { id: 72, option_type: 'Inspectors', value: 'S. Kumara', label: 'S. Kumara', sort_order: 3 },
    { id: 80, option_type: 'Vehicle Condition', value: 'Excellent', label: 'Excellent', sort_order: 1 },
    { id: 81, option_type: 'Vehicle Condition', value: 'Good', label: 'Good', sort_order: 2 },
    { id: 82, option_type: 'Vehicle Condition', value: 'Fair', label: 'Fair', sort_order: 3 },
    { id: 90, option_type: 'Body Conditions', value: 'No Damage', label: 'No Damage', sort_order: 1 },
    { id: 91, option_type: 'Body Conditions', value: 'Minor Scratches', label: 'Minor Scratches', sort_order: 2 },
    { id: 92, option_type: 'Body Conditions', value: 'Major Damage', label: 'Major Damage', sort_order: 3 },
    { id: 100, option_type: 'Transmission Types', value: 'Automatic', label: 'Automatic', sort_order: 1 },
    { id: 101, option_type: 'Transmission Types', value: 'Manual', label: 'Manual', sort_order: 2 },
    { id: 102, option_type: 'Transmission Types', value: 'CVT', label: 'CVT', sort_order: 3 },
    { id: 110, option_type: 'Types of Vehicle', value: 'Car', label: 'Car', sort_order: 1 },
    { id: 111, option_type: 'Types of Vehicle', value: 'Van', label: 'Van', sort_order: 2 },
    { id: 112, option_type: 'Types of Vehicle', value: 'Truck', label: 'Truck', sort_order: 3 },
    { id: 113, option_type: 'Types of Vehicle', value: 'SUV', label: 'SUV', sort_order: 4 },
    { id: 114, option_type: 'Types of Vehicle', value: 'Motorcycle', label: 'Motorcycle', sort_order: 5 },
    { id: 120, option_type: 'Seat Data', value: '2', label: '2 Seats', sort_order: 1 },
    { id: 121, option_type: 'Seat Data', value: '4', label: '4 Seats', sort_order: 2 },
    { id: 122, option_type: 'Seat Data', value: '5', label: '5 Seats', sort_order: 3 },
    { id: 123, option_type: 'Seat Data', value: '7', label: '7 Seats', sort_order: 4 },
    { id: 130, option_type: 'VAT Status', value: 'Registered', label: 'VAT Registered', sort_order: 1 },
    { id: 131, option_type: 'VAT Status', value: 'Not Registered', label: 'Not VAT Registered', sort_order: 2 },
    { id: 140, option_type: 'Option Condition', value: 'Working', label: 'Working', sort_order: 1 },
    { id: 141, option_type: 'Option Condition', value: 'Not Working', label: 'Not Working', sort_order: 2 },
    { id: 142, option_type: 'Option Condition', value: 'N/A', label: 'N/A', sort_order: 3 },
    { id: 150, option_type: 'Maintain Conditions', value: 'Well Maintained', label: 'Well Maintained', sort_order: 1 },
    { id: 151, option_type: 'Maintain Conditions', value: 'Partially Maintained', label: 'Partially Maintained', sort_order: 2 },
    { id: 152, option_type: 'Maintain Conditions', value: 'Not Maintained', label: 'Not Maintained', sort_order: 3 },
    { id: 160, option_type: 'Yard Details', value: 'Monaragala Yard', label: 'Monaragala Yard', sort_order: 1 },
    { id: 161, option_type: 'Yard Details', value: 'Badulla Yard', label: 'Badulla Yard', sort_order: 2 },
    { id: 170, option_type: 'Brake Type', value: 'Disc', label: 'Disc Brake', sort_order: 1 },
    { id: 171, option_type: 'Brake Type', value: 'Drum', label: 'Drum Brake', sort_order: 2 },
    { id: 180, option_type: 'Steering Types', value: 'Power Steering', label: 'Power Steering', sort_order: 1 },
    { id: 181, option_type: 'Steering Types', value: 'Manual Steering', label: 'Manual Steering', sort_order: 2 },
    { id: 190, option_type: 'Test Types', value: 'Road Test', label: 'Road Test', sort_order: 1 },
    { id: 191, option_type: 'Test Types', value: 'Static Test', label: 'Static Test', sort_order: 2 },
    { id: 200, option_type: 'Suspension Type', value: 'Coil Spring', label: 'Coil Spring', sort_order: 1 },
    { id: 201, option_type: 'Suspension Type', value: 'Leaf Spring', label: 'Leaf Spring', sort_order: 2 },
    { id: 202, option_type: 'Suspension Type', value: 'MacPherson Strut', label: 'MacPherson Strut', sort_order: 3 },
    { id: 210, option_type: 'Suspension Conditions', value: 'Good', label: 'Good', sort_order: 1 },
    { id: 211, option_type: 'Suspension Conditions', value: 'Fair', label: 'Fair', sort_order: 2 },
    { id: 212, option_type: 'Suspension Conditions', value: 'Needs Repair', label: 'Needs Repair', sort_order: 3 },
    { id: 220, option_type: 'Clutch type', value: 'Single Plate', label: 'Single Plate', sort_order: 1 },
    { id: 221, option_type: 'Clutch type', value: 'Multi Plate', label: 'Multi Plate', sort_order: 2 },
    { id: 230, option_type: 'Clutch Conditions', value: 'Good', label: 'Good', sort_order: 1 },
    { id: 231, option_type: 'Clutch Conditions', value: 'Fair', label: 'Fair', sort_order: 2 },
    { id: 232, option_type: 'Clutch Conditions', value: 'Slipping', label: 'Slipping', sort_order: 3 },
    { id: 240, option_type: 'Interior Types', value: 'Fabric', label: 'Fabric', sort_order: 1 },
    { id: 241, option_type: 'Interior Types', value: 'Leather', label: 'Leather', sort_order: 2 },
    { id: 242, option_type: 'Interior Types', value: 'Half Leather', label: 'Half Leather', sort_order: 3 },
    { id: 250, option_type: 'Starter Types', value: 'Electric', label: 'Electric', sort_order: 1 },
    { id: 251, option_type: 'Starter Types', value: 'Kick', label: 'Kick', sort_order: 2 },
    { id: 260, option_type: 'Electrical Condition', value: 'Good', label: 'Good', sort_order: 1 },
    { id: 261, option_type: 'Electrical Condition', value: 'Fair', label: 'Fair', sort_order: 2 },
    { id: 262, option_type: 'Electrical Condition', value: 'Faulty', label: 'Faulty', sort_order: 3 },
    { id: 270, option_type: 'Wiper Type', value: 'Manual', label: 'Manual', sort_order: 1 },
    { id: 271, option_type: 'Wiper Type', value: 'Automatic', label: 'Automatic', sort_order: 2 },
    { id: 280, option_type: 'Body type', value: 'Sedan', label: 'Sedan', sort_order: 1 },
    { id: 281, option_type: 'Body type', value: 'Hatchback', label: 'Hatchback', sort_order: 2 },
    { id: 282, option_type: 'Body type', value: 'SUV', label: 'SUV', sort_order: 3 },
    { id: 283, option_type: 'Body type', value: 'Pickup', label: 'Pickup', sort_order: 4 },
    { id: 290, option_type: 'Fuel System', value: 'EFI', label: 'EFI', sort_order: 1 },
    { id: 291, option_type: 'Fuel System', value: 'Carburettor', label: 'Carburettor', sort_order: 2 },
    { id: 292, option_type: 'Fuel System', value: 'Direct Injection', label: 'Direct Injection', sort_order: 3 },
    { id: 300, option_type: 'Differential Type', value: '4WD', label: '4WD', sort_order: 1 },
    { id: 301, option_type: 'Differential Type', value: '2WD', label: '2WD', sort_order: 2 },
    { id: 302, option_type: 'Differential Type', value: 'AWD', label: 'AWD', sort_order: 3 },
    { id: 310, option_type: 'Differential Condition', value: 'Good', label: 'Good', sort_order: 1 },
    { id: 311, option_type: 'Differential Condition', value: 'Noisy', label: 'Noisy', sort_order: 2 },
    { id: 312, option_type: 'Differential Condition', value: 'Faulty', label: 'Faulty', sort_order: 3 },
    { id: 320, option_type: 'Brake Conditions', value: 'Good', label: 'Good', sort_order: 1 },
    { id: 321, option_type: 'Brake Conditions', value: 'Fair', label: 'Fair', sort_order: 2 },
    { id: 322, option_type: 'Brake Conditions', value: 'Needs Replacement', label: 'Needs Replacement', sort_order: 3 },
    { id: 330, option_type: 'Air type', value: 'Single A/C', label: 'Single A/C', sort_order: 1 },
    { id: 331, option_type: 'Air type', value: 'Dual A/C', label: 'Dual A/C', sort_order: 2 },
    { id: 340, option_type: 'Tyre Wheel Type', value: 'Alloy', label: 'Alloy', sort_order: 1 },
    { id: 341, option_type: 'Tyre Wheel Type', value: 'Steel', label: 'Steel', sort_order: 2 },
    { id: 350, option_type: 'Tyre Front Type', value: 'Radial', label: 'Radial', sort_order: 1 },
    { id: 351, option_type: 'Tyre Front Type', value: 'Bias', label: 'Bias', sort_order: 2 },
    { id: 360, option_type: 'Tyre Rear Type', value: 'Radial', label: 'Radial', sort_order: 1 },
    { id: 361, option_type: 'Tyre Rear Type', value: 'Bias', label: 'Bias', sort_order: 2 },
    { id: 370, option_type: 'Tyre Material Type', value: 'Tubeless', label: 'Tubeless', sort_order: 1 },
    { id: 371, option_type: 'Tyre Material Type', value: 'Tube Type', label: 'Tube Type', sort_order: 2 },
  ];

  const d = (daysAgo) => new Date(Date.now() - daysAgo * 86400000).toISOString();

  const MOCK_VALUATIONS = [
    { id: 101, reg_no: 'CAA-1234', make: 'Toyota', model: 'Corolla', market_value: 4500000, forced_value: 3800000, status: 'Approved', created_at: d(0), branch: '10', finance_company: '1', finance_branch: '10', engine_no: 'TY1234567', chassis_no: 'CH9876543', yom: '2018', fuel_type: 'Petrol', body_color: 'White', seating_cap: '5', engine_capacity: '1800', vehicle_type: 'Car', country_origin: 'Japan', country_used: 'Japan', opinion_to: 'Commercial Bank', transmission: 'Automatic', gearbox_con: 'Good', clutch_type: 'Single Plate', clutch_con: 'Good', shaft_type: 'Coil Spring', shaft_con: 'Good', foot_brake_con: 'Good', parking_brake_con: 'Good', steering_con: 'Good', chassis_con: 'Well Maintained', body_con: 'No Damage', engine_con: 'Well Maintained', engine_status: 'Good', suspen_fr_con: 'Good', suspen_re_con: 'Good', pw_shutter_con: 'Working', pw_mirror_con: 'Working', ac_con: 'Working', horn_con: 'Working', light_con: 'Working', meter_con: 'Working', alternator_con: 'Working', starter_con: 'Good', wiper_con: 'Working', inter_trim: 'Fabric', body_maint: 'Well Maintained', vehicle_con: 'Good', complience_envir: '1', inspection_date: '2025-06-01', inspect_location: 'Monaragala', road_test_done_on: '2025-06-01', fuel_consumption: '12 km/l', test_comment: 'Vehicle in good condition. Road test passed.', fr_size: '185/65R15', re_size: '185/65R15', meter_reading: '85000', meter_unit: 'km', current_owner: 'K. Bandara', extra_options: 'ABS,AIR BAG,Rear Wiper,Fog Lamps', val_fee: 3500, trv_fee: 500, rer_fee: 0, has_vat: true, image_paths: [] },
    { id: 102, reg_no: 'WP-KJ-5678', make: 'Honda', model: 'Fit', market_value: 3200000, forced_value: 2700000, status: 'Pending', created_at: d(0), branch: '11', finance_company: '2', finance_branch: '11', engine_no: 'HN7654321', chassis_no: 'CH1234567', yom: '2019', fuel_type: 'Hybrid', body_color: 'Silver', seating_cap: '5', engine_capacity: '1300', vehicle_type: 'Car', country_origin: 'Japan', image_paths: [] },
    { id: 103, reg_no: 'UVA-9012', make: 'Nissan', model: 'Sunny', market_value: 2800000, forced_value: 2300000, status: 'Approved', created_at: d(1), branch: '12', finance_company: '3', finance_branch: '12', engine_no: 'NS4567890', chassis_no: 'CH4567890', yom: '2016', fuel_type: 'Petrol', body_color: 'Blue', seating_cap: '5', engine_capacity: '1500', vehicle_type: 'Car', country_origin: 'Japan', image_paths: [] },
    { id: 104, reg_no: 'SGD-3456', make: 'Mitsubishi', model: 'Montero', market_value: 8500000, forced_value: 7200000, status: 'Approved', created_at: d(1), branch: '13', finance_company: '1', finance_branch: '13', engine_no: 'MM3456789', chassis_no: 'CH3456789', yom: '2020', fuel_type: 'Diesel', body_color: 'Black', seating_cap: '7', engine_capacity: '3200', vehicle_type: 'SUV', country_origin: 'Japan', image_paths: [] },
    { id: 105, reg_no: 'CAA-7890', make: 'Suzuki', model: 'Alto', market_value: 1800000, forced_value: 1500000, status: 'Pending', created_at: d(2), branch: '10', finance_company: '4', finance_branch: '10', engine_no: 'SZ9012345', chassis_no: 'CH9012345', yom: '2021', fuel_type: 'Petrol', body_color: 'Red', seating_cap: '4', engine_capacity: '800', vehicle_type: 'Car', country_origin: 'Japan', image_paths: [] },
    { id: 106, reg_no: 'UVA-2345', make: 'Isuzu', model: 'NKR', market_value: 5200000, forced_value: 4400000, status: 'Rejected', created_at: d(3), branch: '11', finance_company: '2', finance_branch: '11', engine_no: 'IZ5678901', chassis_no: 'CH5678901', yom: '2017', fuel_type: 'Diesel', body_color: 'White', seating_cap: '2', engine_capacity: '3100', vehicle_type: 'Truck', country_origin: 'Japan', image_paths: [] },
    { id: 107, reg_no: 'CAA-5678', make: 'Toyota', model: 'KDH Van', market_value: 6800000, forced_value: 5800000, status: 'Approved', created_at: d(4), branch: '10', finance_company: '5', finance_branch: '10', engine_no: 'TY7890123', chassis_no: 'CH7890123', yom: '2019', fuel_type: 'Diesel', body_color: 'Silver', seating_cap: '14', engine_capacity: '2500', vehicle_type: 'Van', country_origin: 'Japan', image_paths: [] },
    { id: 108, reg_no: 'SGD-8901', make: 'Honda', model: 'Vezel', market_value: 7200000, forced_value: 6100000, status: 'Pending', created_at: d(5), branch: '12', finance_company: '1', finance_branch: '12', engine_no: 'HN2345678', chassis_no: 'CH2345678', yom: '2022', fuel_type: 'Hybrid', body_color: 'White', seating_cap: '5', engine_capacity: '1500', vehicle_type: 'Car', country_origin: 'Japan', image_paths: [] },
    { id: 109, reg_no: 'WP-BB-1111', make: 'Toyota', model: 'Prius', market_value: 5900000, forced_value: 5000000, status: 'Approved', created_at: d(7), branch: '13', finance_company: '3', finance_branch: '13', engine_no: 'TY1111222', chassis_no: 'CH1111222', yom: '2020', fuel_type: 'Hybrid', body_color: 'Blue', seating_cap: '5', engine_capacity: '1800', vehicle_type: 'Car', country_origin: 'Japan', image_paths: [] },
    { id: 110, reg_no: 'UVA-3333', make: 'Tata', model: 'Ace', market_value: 2200000, forced_value: 1900000, status: 'Approved', created_at: d(10), branch: '10', finance_company: '2', finance_branch: '10', engine_no: 'TA3333444', chassis_no: 'CH3333444', yom: '2018', fuel_type: 'Diesel', body_color: 'White', seating_cap: '2', engine_capacity: '700', vehicle_type: 'Truck', country_origin: 'India', image_paths: [] },
    { id: 111, reg_no: 'CAA-4444', make: 'Nissan', model: 'X-Trail', market_value: 9500000, forced_value: 8000000, status: 'Approved', created_at: d(12), branch: '11', finance_company: '4', finance_branch: '11', engine_no: 'NS4444555', chassis_no: 'CH4444555', yom: '2021', fuel_type: 'Petrol', body_color: 'Black', seating_cap: '7', engine_capacity: '2500', vehicle_type: 'SUV', country_origin: 'Japan', image_paths: [] },
    { id: 112, reg_no: 'SGD-5555', make: 'Suzuki', model: 'Swift', market_value: 2600000, forced_value: 2200000, status: 'Rejected', created_at: d(15), branch: '12', finance_company: '5', finance_branch: '12', engine_no: 'SZ5555666', chassis_no: 'CH5555666', yom: '2019', fuel_type: 'Petrol', body_color: 'Red', seating_cap: '5', engine_capacity: '1200', vehicle_type: 'Car', country_origin: 'Japan', image_paths: [] },
  ];

  const MOCK_USERS = [
    { id: 1, username: 'admin', first_name: 'Prasanna', last_name: 'Abeysundara', email: 'prasanna@awassociates.lk', role: 'admin', branch: '10', created_at: new Date(Date.now() - 60*86400000).toISOString() },
    { id: 2, username: 'kasun', first_name: 'Kasun', last_name: 'Bandara', email: 'kasun@awassociates.lk', role: 'user', branch: '10', created_at: new Date(Date.now() - 45*86400000).toISOString() },
    { id: 3, username: 'nimali', first_name: 'Nimali', last_name: 'Perera', email: 'nimali@awassociates.lk', role: 'user', branch: '11', created_at: new Date(Date.now() - 30*86400000).toISOString() },
    { id: 4, username: 'ruwan', first_name: 'Ruwan', last_name: 'Silva', email: 'ruwan@awassociates.lk', role: 'user', branch: '11', created_at: new Date(Date.now() - 20*86400000).toISOString() },
    { id: 5, username: 'amaya', first_name: 'Amaya', last_name: 'Kumari', email: 'amaya@awassociates.lk', role: 'user', branch: '12', created_at: new Date(Date.now() - 15*86400000).toISOString() },
    { id: 6, username: 'dilshan', first_name: 'Dilshan', last_name: 'Fernando', email: 'dilshan@awassociates.lk', role: 'user', branch: '13', created_at: new Date(Date.now() - 10*86400000).toISOString() },
  ];

  function mockResponse(data) {
    return Promise.resolve(new Response(JSON.stringify(data), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    }));
  }

  function handleMockRoute(url, method, body) {
    const path = url.replace(/^https?:\/\/localhost:8080/, '').split('?')[0];
    const params = new URLSearchParams(url.includes('?') ? url.split('?')[1] : '');

    if (path === '/api/auth/login' && method === 'POST') {
      const b = typeof body === 'string' ? JSON.parse(body) : {};
      const isAdmin = b.username === 'admin' || b.username === 'demo';
      return mockResponse({
        success: true,
        data: {
          token: DEMO_TOKEN,
          user: isAdmin
            ? { id: 1, username: b.username || 'demo', first_name: 'Demo', last_name: 'Admin', role: 'admin', branch: '10' }
            : { id: 2, username: b.username || 'user', first_name: 'Demo', last_name: 'User', role: 'user', branch: '10' }
        }
      });
    }

    if (path === '/api/auth/logout') return mockResponse({ success: true });

    if (path === '/api/stats') {
      const todayStr = new Date().toISOString().substring(0,10);
      const monthStr = new Date().toISOString().substring(0,7);
      return mockResponse({
        success: true, data: {
          total_valuations: MOCK_VALUATIONS.length,
          approved_valuations: MOCK_VALUATIONS.filter(v => v.status === 'Approved').length,
          pending_valuations: MOCK_VALUATIONS.filter(v => v.status === 'Pending').length,
          rejected_valuations: MOCK_VALUATIONS.filter(v => v.status === 'Rejected').length,
          today_valuations: MOCK_VALUATIONS.filter(v => v.created_at.startsWith(todayStr)).length || 3,
          monthly_valuations: MOCK_VALUATIONS.filter(v => v.created_at.startsWith(monthStr)).length || 12,
          total_users: MOCK_USERS.length,
          user_today: 2, user_monthly: 8, user_total: MOCK_VALUATIONS.length,
          branch_today: 2, branch_monthly: 10, branch_total: MOCK_VALUATIONS.length, branch_users: 3,
        }
      });
    }

    if (path === '/api/options') {
      if (method === 'POST') return mockResponse({ success: true, data: { id: 999, ...JSON.parse(body||'{}') }, message: 'Demo: option saved (not persisted)' });
      return mockResponse({ success: true, data: MOCK_OPTIONS });
    }
    if (path.startsWith('/api/options/')) {
      if (method === 'PUT') return mockResponse({ success: true, message: 'Demo: option updated (not saved)' });
      if (method === 'DELETE') return mockResponse({ success: true, message: 'Demo: option deleted (not saved)' });
    }

    if (path === '/api/valuations' || path === '/api/valuations/pending') {
      if (method === 'POST') return mockResponse({ success: true, data: { id: 999 }, message: '✓ Demo mode: Valuation saved (not persisted)' });
      const perPage = parseInt(params.get('per_page') || '20', 10);
      const page = parseInt(params.get('page') || '1', 10);
      let items = [...MOCK_VALUATIONS];
      if (path.includes('pending')) items = items.filter(v => v.status === 'Pending');
      const start = (page - 1) * perPage;
      return mockResponse({ success: true, data: { items: items.slice(start, start + perPage), total: items.length, page, per_page: perPage, total_pages: Math.ceil(items.length / perPage) } });
    }

    const valIdMatch = path.match(/^\/api\/valuations\/(\d+)$/);
    if (valIdMatch) {
      const id = parseInt(valIdMatch[1]);
      const val = MOCK_VALUATIONS.find(v => v.id === id) || MOCK_VALUATIONS[0];
      if (method === 'PUT') return mockResponse({ success: true, data: val, message: 'Demo: updated (not saved)' });
      if (method === 'DELETE') return mockResponse({ success: true, message: 'Demo: deleted (not saved)' });
      if (method === 'PATCH') return mockResponse({ success: true, message: 'Demo: status updated (not saved)' });
      return mockResponse({ success: true, data: val });
    }

    if (path.match(/\/api\/valuations\/\d+\/images/)) return mockResponse({ success: true, message: 'Demo: images uploaded (not saved)' });
    if (path.match(/\/api\/valuations\/\d+\/status/)) return mockResponse({ success: true, message: 'Demo: status updated (not saved)' });

    if (path === '/api/users') {
      if (method === 'POST') return mockResponse({ success: true, data: { id: 99 }, message: 'Demo: user created (not saved)' });
      return mockResponse({ success: true, data: MOCK_USERS });
    }
    if (path.startsWith('/api/users/')) {
      if (method === 'PUT') return mockResponse({ success: true, message: 'Demo: user updated (not saved)' });
      if (method === 'DELETE') return mockResponse({ success: true, message: 'Demo: user deleted (not saved)' });
    }

    if (path === '/api/health') return mockResponse({ status: 'ok', service: 'aw-associates-demo' });

    return mockResponse({ success: true, data: [], message: 'Demo mode' });
  }

  const _realFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    const url = (typeof input === 'string') ? input : (input instanceof Request ? input.url : String(input));
    const method = (init && init.method) ? init.method.toUpperCase() : (input instanceof Request ? input.method : 'GET');
    const body = (init && init.body) ? init.body : undefined;
    if (url.includes('localhost:8080') || url.includes('127.0.0.1:8080')) {
      console.log('[DEMO API]', method, url);
      return handleMockRoute(url, method, body);
    }
    return _realFetch(input, init);
  };

  if (!localStorage.getItem('aw_token')) {
    localStorage.setItem('aw_token', DEMO_TOKEN);
    localStorage.setItem('aw_user', JSON.stringify({ id: 1, username: 'demo', first_name: 'Demo', last_name: 'Admin', role: 'admin', branch: '10' }));
  }

  console.log('[DEMO MODE] AW Associates Demo API active.');
})();
