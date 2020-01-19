import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'
import {  connect, disconnect, subscribeToNewDevs } from '../services/socket'

function Main({ navigation }) {
  
  const [ devs, setDevs] = useState([])
  const [ currentRegion, setCurrernRegion ] = useState(null)
  const [ techs, setTechs ] = useState('')
  
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync()
      if (granted) {
          const { coords } = await getCurrentPositionAsync({
            enableHighAccuracy: true
        })

        const { latitude, longitude } = coords
        setCurrernRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        })
      }
    }

    loadInitialPosition()
  }, []);

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]))
  }, [devs])
  
  function setWebSocket() {
    disconnect()

    const { latitude, longitude} = currentRegion
    connect(
      latitude,
      longitude,
      techs
    )
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    })

    console.log(response.data)
    setDevs(response.data.devs)
    setWebSocket()
  }

  function handleRegionChange(region) {
    setCurrernRegion(region)
    console.log(region)
  }

  if (!currentRegion) {
    return null
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChange}
        initialRegion={currentRegion}
        style={style.mapa}
      >

      {
        devs.map(dev => (

          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1] }}>
            <Image
              style={style.avatar}
              source={{ uri: dev.avatar_url }} />
            <Callout onPress={() => {
              navigation.navigate('Profile', { github_username: dev.github_username })
            }}>
              <View style={style.callout}>
                <Text style={style.devName}>{dev.name}</Text>
                <Text style={style.devBio}>{dev.bio}</Text>
                <Text style={style.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>

        ))
      }

    </MapView>
      <View style={style.searchForm}>
        <TextInput 
          style={style.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={loadDevs} style={style.loadButton}>
          {/* <FontAwesome5 name="globe-americas" size={20} color="#FFF"/> */}
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  mapa: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#F7978D'
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16
  },
  devBio: {
    color: "#666666",
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  },

  //forms
  searchForm: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 9,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    //for ios
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },

    //for android
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: "#F7978D",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
})

export default Main