import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import fonts from '../styles/fonts';
import { ChangeValue, InsertCar, GetCars, RemoveCar, CleaningState } from '../actions/FeedAction';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CarList from '../components/CarList';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import { isValidLicense } from '../util/util';

class FeedCars extends Component {

  constructor() {
    super();
    this.state = {
      errors: {}
    }
  }

  componentDidMount = () => {
    this.props.GetCars();
  }

  onChangeText = (state, text) => {
    this.props.ChangeValue(state, text)
  }

  addCar = () => {
    var licensePlate = this.props.licensePlate;

    if (!isValidLicense(licensePlate) && licensePlate != "") {
      Alert.alert("Erro", "Placa inválida");
      return
    }

    this.props.InsertCar(this.props.licensePlate);
    this.props.GetCars();
    this.props.CleaningState();
  }

  removeCar = (id) => {
    this.props.RemoveCar(id);
    this.props.CleaningState();
    this.props.GetCars();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewAddCar}>
          <Text style={{paddingVertical: 10, fontFamily: fonts.bold}}>Adicionar novo veículo</Text>

          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              style={styles.inputSt}
              maxLength={7}
              onChangeText={text => this.onChangeText('licensePlate', text)}
              placeholder={"Placa"}
              value={this.props.licensePlate}
            />
            <TouchableOpacity
              onPress={() => { this.addCar() }}
              style={{paddingHorizontal: 10, alignItems: 'center'}}>
              <Icon
                name='plus-circle'
                size={25}
                color={colors.white2}
                style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewCars}>
          {this.props.loading && <Loader />}

          {this.props.data.length == 0 &&
            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
              <Text style={{alignSelf: 'center'}}>Nenhum carro adicionado</Text>
            </View>
          }

          {this.props.data.length != 0 && 
          <View style={{flex: 1}}>
            <Text style={{paddingVertical: 20, fontFamily: fonts.bold}}>Veículos</Text>
            <FlatList
              onRefresh={() => this.props.GetCars()}
              refreshing={this.props.refreshing}
              indicatorStyle={"white"}
              contentContainerStyle={{ paddingBottom: 16 }}
              data={this.props.data}
              renderItem={({ item }) => <CarList item={item} callback={() => {this.removeCar(item.id)}}/>}
            />
          </View>}

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewAddCar:{
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
  inputSt: {
    height: 40, 
    width: 250, 
    borderColor: colors.gray, 
    borderWidth: 1, 
    paddingHorizontal: 10, 
    borderRadius: 8 
  },
  viewCars:{
    flex: 4, 
    paddingHorizontal: 40, 
    paddingVertical: 40, 
    backgroundColor: colors.white 
  }
});


const mapStateToProps = state => (
  {
    licensePlate: state.FeedReducers.licensePlate,
    data: state.FeedReducers.data,
    refreshing: state.FeedReducers.refreshing,
  }
)

export default connect(mapStateToProps, { ChangeValue, InsertCar, GetCars, RemoveCar, CleaningState })(FeedCars);