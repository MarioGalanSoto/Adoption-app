import React from 'react';
import {
    Dimensions, SafeAreaView,
    StyleSheet, Text,
    View, Image,
    ScrollView, TextInput,
    TouchableOpacity
}
    from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import pets from '../../../src/const/pets';
import COLORS from '../../const/colors';
import DetailsScreen from './DetailsScreen';

const { height } = Dimensions.get('window');

const petCategories = [
    { name: 'CATS', icon: 'cat' },
    { name: 'DOGS', icon: 'dog' },
    { name: 'BIRDS', icon: 'ladybug' },
    { name: 'BUNNIES', icon: 'rabbit' },
];

const Card = ({ pet, navigation }) => {
    return <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("DetailsScreen", pet)}>
        <View style={style.cardContainer}>
            <View style={style.cardImageContainer}>
                <Image source={pet.image} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
            </View>

            <View style={style.cardDetailsContainer}>
                <View style={{ marginLeft: 10, paddingRight: 10 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{ fontWeight: 'bold', color: COLORS.dark, fontSize: 20, }}>
                            {pet?.name}
                        </Text>
                        <Icon name="gender-male" size={22} color={COLORS.grey} />
                    </View>
                    <Text style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}>{pet?.type}</Text>
                    <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.dark }}>{pet?.age}</Text>
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Icon name="map-marker" size={18} color={COLORS.primary} />
                        <Text style={{ fontSize: 12, marginLeft: 5, color: COLORS.grey }}>Distance: 7.8km</Text>
                    </View>
                </View>
            </View>

        </View>
    </TouchableOpacity>
}

const HomeScreen = ({ navigation }) => {

    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [filteredPets, setFilteredPets] = React.useState([]);

    const filterPet = index => {
        const currentPets = pets.filter((item) => item?.pet?.toUpperCase() == petCategories[index].name,
        )[0].pets;

        // console.log(currentPets);
        setFilteredPets(currentPets);
    };

    React.useEffect(() => {
        filterPet(0);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, color: COLORS.white }}>

            {/* header view starts */}
            <View style={style.header}>
                <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />

                <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>Jane Gary</Text>

                <Image
                    source={require('../../../assets/profile-image.jpg')}
                    style={{ height: 35, width: 35, borderRadius: 15 }}
                />

            </View>
            {/* header view ends */}

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={style.mainContainer}>

                    {/* search input view starts */}
                    <View style={style.searchInputContainer}>

                        <Icon name="magnify" size={20} color={COLORS.grey} />

                        <TextInput
                            placeholder=' Search pet to adopt'
                            style={{ flex: 1 }}
                            placeholderTextColor={COLORS.grey}>
                        </TextInput>

                        <Icon name="sort-ascending" size={20} color={COLORS.grey} />

                    </View>
                    {/* search input view ends */}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20,
                        }}>
                        {petCategories.map((item, index) => (
                            <View key={"pet" + index} style={{ alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        filterPet(index);
                                        setSelectedCategoryIndex(index);
                                    }}
                                    style={[style.categoryBtn, {
                                        backgroundColor: selectedCategoryIndex == index
                                            ? COLORS.primary
                                            : COLORS.white,
                                    }]}>
                                    <Icon name={item.icon} size={30} color={selectedCategoryIndex == index ? COLORS.white : COLORS.primary}></Icon>
                                </TouchableOpacity>
                                <Text style={style.categoryBtnName}>{item.name}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={{ marginTop: 20, }}>
                        {filteredPets.map((item, index) => <Card key={"image" + index} pet={item} navigation={navigation} />)}
                        {/* <FlatList
                            showsHorizontalScrollIndicator={true}
                            data={filteredPets}
                            renderItem={({ item }) => <Card pet={item} navigation={navigation} />}
                        /> */}
                    </View>
                </View>


            </ScrollView>


        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        padding: 20,
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainContainer: {
        minHeight: height,
        backgroundColor: COLORS.light,
        marginTop: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 40,

    },
    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 7,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryBtn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.primary,
    },
    categoryBtnName: {
        color: COLORS.dark,
        fontSize: 10,
        marginTop: 5,
        fontWeight: 'bold',
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardImageContainer: {
        height: 150,
        width: 140,
        backgroundColor: COLORS.background,
        borderRadius: 20,
    },
    cardDetailsContainer: {
        height: 120,
        backgroundColor: COLORS.white,
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
    },

});

export default HomeScreen;
