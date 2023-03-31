import { useState } from 'react';
import { Badge, Box, Tab, Tabs, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import Orders from './Orders';
import { useQuery } from 'react-query';
import { getOrders } from './api_calls';
import { ORDER_DONE, ORDER_IN_PROGRESS } from './constants';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const OrdersTabs = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const { data: orders, isFetching: isLoadingOrders } = useQuery({
        queryKey: 'orders',
        queryFn: getOrders,
        placeholderData: [],
    });

    const openOrdersCount = orders ? orders.filter(order => order.status === ORDER_IN_PROGRESS).length : 0;


    return (
        <Stack sx={{ flexGrow: 1, p: 2, m: "0 auto", maxWidth: 1200 }} dir="rtl">
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs aria-label="order tabs" centered value={selectedTab} onChange={handleChange}>
                    <Tab label={
                        <Badge badgeContent={openOrdersCount} color="secondary" sx={{ pl: 1.5 }} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                            הזמנות פתוחות
                        </Badge>
                    } />
                    <Tab label="הזמנות שהסתיימו" />
                </Tabs>
                <TabPanel value={selectedTab} index={0}>
                    <Orders orders={orders} status={ORDER_IN_PROGRESS} />
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <Orders orders={orders} status={ORDER_DONE} />
                </TabPanel>
            </Box>
        </Stack>
    );
};

export default OrdersTabs;