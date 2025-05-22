import { BookingHistoryDetailScreenRouteProp } from "@/libs/navigation";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, FlatList, ScrollView, Image } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Booking } from "@/types/implement/booking";
import { Tour } from "@/types/implement";
import { getTourDetails } from "@/services/tour-service";
import { Colors } from "@/constants";
import { formatDateToDDMMYYYY } from "@/utils/format-date";

const renderStatus = (status?: "PAID" | "PENDING" | "EXPIRED") => {
    switch (status) {
        case "PAID":
            return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name="check-circle" size={20} color="#1abc9c" style={{ marginRight: 6 }} />
                    <Text style={{ color: "#1abc9c", fontWeight: "700", fontSize: 16 }}>Đã thanh toán</Text>
                </View>
            );
        case "PENDING":
            return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name="hourglass-empty" size={20} color="#f39c12" style={{ marginRight: 6 }} />
                    <Text style={{ color: "#f39c12", fontWeight: "700", fontSize: 16 }}>Chờ thanh toán</Text>
                </View>
            );
        case "EXPIRED":
            return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name="cancel" size={20} color="#e74c3c" style={{ marginRight: 6 }} />
                    <Text style={{ color: "#e74c3c", fontWeight: "700", fontSize: 16 }}>Hết hạn</Text>
                </View>
            );
        default:
            return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name="help-outline" size={20} color="gray" style={{ marginRight: 6 }} />
                    <Text style={{ color: "gray", fontWeight: "700", fontSize: 16 }}>Không rõ</Text>
                </View>
            );
    }
};

const localePrice = (price?: number) => (price ? price.toLocaleString("vi-VN") : "N/A");

const renderTicketType = (ticketType?: string) => {
    switch (ticketType) {
        case "ADULT":
            return "Người lớn";
        case "CHILD":
            return "Trẻ em";
        case "BABY":
            return "Trẻ sơ sinh";
        default:
            return "Không xác định";
    }
};

export const BookingHistoryDetailScreen = () => {
    const route = useRoute<BookingHistoryDetailScreenRouteProp>();
    const booking = route.params.bookingData;
    const [tourDetail, setTourDetail] = useState<Tour>();

    useEffect(() => {
        const fetchBookingDetail = async () => {
            try {
                const response = await getTourDetails(booking.tourSchedule.tourId || "");
                if (response.statusCode === 200 && response.data) {
                    setTourDetail(response.data);
                }
            } catch (error) {
                console.log("Error fetching booking detail:", error);
            }
        };
        fetchBookingDetail();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Tour Info */}
                {tourDetail && (
                    <View style={styles.tourSection}>
                        <Text style={styles.tourHeader}>Thông tin tour</Text>
                        {tourDetail.thumbnail && (
                            <View style={{ alignItems: "center", marginBottom: 10 }}>
                                <Image
                                    source={{ uri: tourDetail.thumbnail }}
                                    style={styles.tourImage}
                                    resizeMode="cover"
                                />
                            </View>
                        )}
                        <Text style={styles.tourName}>{tourDetail.name}</Text>
                        {tourDetail.duration && (
                            <Text style={styles.tourDuration}>Thời lượng: {tourDetail.duration}</Text>
                        )}
                        {tourDetail.description && (
                            <Text style={styles.tourDescription}>{tourDetail.description}</Text>
                        )}
                    </View>
                )}

                {/* Booking Info */}
               <View style={styles.section}>
                  <Text style={styles.sectionHeader}>Chi tiết đặt vé</Text>
                  <View style={styles.rowBetween}>
                     <Text style={styles.label}>Trạng thái:</Text>
                     {renderStatus(booking.status)}
                  </View>
                  <View style={styles.rowBetween}>
                     <Text style={styles.label}>Tổng tiền:</Text>
                     <Text style={styles.price}>{localePrice(booking.totalPrice)} đ</Text>
                  </View>
                  <View style={styles.rowBetween}>
                     <Text style={styles.label}>Ngày đặt:</Text>
                     <Text style={styles.value}>
                        {formatDateToDDMMYYYY(booking.tourSchedule.startDate || null) || "N/A"}
                           
                     </Text>
                  </View>
  
               </View>
               <View style={styles.divider} />
               <View style={styles.section}>
                  <Text style={styles.sectionHeader}>Thông tin khách hàng</Text>
                  <View style={styles.infoRow}>
                     <Feather name="user" size={16} color="#555" style={{ marginRight: 6 }} />
                     <Text style={styles.value}>{booking.userFullName || "N/A"}</Text>
                  </View>
                  <View style={styles.infoRow}>
                     <Feather name="phone" size={16} color="#555" style={{ marginRight: 6 }} />
                     <Text style={styles.value}>{booking.userPhone || "N/A"}</Text>
                  </View>
                  <View style={styles.infoRow}>
                     <Feather name="mail" size={16} color="#555" style={{ marginRight: 6 }} />
                     <Text style={styles.value}>{booking.userEmail || "N/A"}</Text>
                  </View>
                  <View style={styles.infoRow}>
                     <Feather name="map-pin" size={16} color="#555" style={{ marginRight: 6 }} />
                     <Text style={styles.value}>{booking.userAddress || "N/A"}</Text>
                  </View>
                  <Text style={[styles.label, { marginTop: 8 }]}>Ghi chú:</Text>
                  <Text style={styles.value}>{booking.note || "Không có"}</Text>
               </View>
                <View style={styles.divider} />
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Danh sách vé</Text>
                    <FlatList
                        data={booking.tickets}
                        keyExtractor={(item) => item.ticketId}
                        renderItem={({ item }) => (
                            <View style={styles.ticketCard}>
                                <Text style={styles.ticketType}>
                                    {renderTicketType(item.ticketType)}
                                </Text>
                                <Text style={styles.ticketPrice}>Giá: {localePrice(item.price)} đ</Text>
                                <Text style={styles.ticketNote}>Ghi chú: {item.note || "Không có"}</Text>
                            </View>
                        )}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    tourSection: {
        marginBottom: 20,
        padding: 14,
        backgroundColor: "#f0f8ff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    tourHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#1a237e",
    },
    tourName: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
        color: "#222",
    },
    tourDuration: {
        fontSize: 14,
        color: "#555",
        marginBottom: 4,
    },
    tourDescription: {
        fontSize: 14,
        color: "#444",
    },
    tourImage: {
        width: 140,
        height: 90,
        borderRadius: 10,
        marginBottom: 8,
    },
    section: {
        marginBottom: 18,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 8,
    },
    label: {
        fontWeight: "600",
        color: "#555",
        marginBottom: 2,
        fontSize: 15,
    },
    value: {
        color: "#222",
        fontSize: 16,
        marginBottom: 4,
    },
    price: {
        color: Colors.colorBrand.burntSienna[500],
        fontWeight: "bold",
        fontSize: 18,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
    },
    ticketCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    ticketType: {
        fontWeight: "bold",
        marginBottom: 2,
    },
    ticketPrice: {
        color: Colors.colorBrand.burntSienna[500],
        fontWeight: "600",
        marginBottom: 2,
    },
    ticketNote: {
        color: "#555",
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: "#ececec",
        marginVertical: 10,
    },
});
