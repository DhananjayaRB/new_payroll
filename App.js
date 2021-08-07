import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Picker,
  TextInput,
  Image,
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  VictoryArea,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryScatter,
  VictoryTheme,
  VictoryLabel,
} from 'victory-native';

import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import logo from './images/pay_download.png';
import login from './login.js';
import {Actions} from 'react-native-router-flux';


class App extends Component {
  constructor() {
    super();

     goToHome = () => {
       Actions.login();
     };

    this.state = {
      selectedmonth: 'Select',
      monthList: [
        {
          PaySlipMonth: 'Select',
        },
      ],
      fpbdecllist: [],
      graphicColor: ['#00BFFF', '#6484E3', '#1fde99'],
      graphicAreaColor: ['#1CC88A', '#36B9FF', '#4E73DF', '#A80E6A'],
      paymonthlist: ['Jan-Mar', 'Oct-Dec', 'Jul-Sep', 'Apr-Jun'],
      areadata: [],
      ctc: [],
      gross: [],
      takehome: [],
      taxdeduction: [],
      txtS80CDeclaration: '_',
      txtCVIADeclaration: '_',
      txtHRADeclaration: '_',
      txtHLIDeclaration: '_',
      txtS80CProof: '_',
      txtCVIAProof: '_',
      txtHRAProof: '_',
      txtHLIProof: '_',
    };
  }

  componentDidMount() {
    this.GetPayslipmonths();
    this.Get_Piedata();
    this.Get_Cummulativedata();
    this.Get_SavingDeclarationData();
    this.GetFBPDeclaration();
  }

  async GetPayslipmonths() {
    await fetch('http://104.211.160.16:89/api/FetchMonths', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          'XpUdZDm8T8neWIyjen2v5QYjDQ0LHg9Gb0sV8UFlbTH6/jgCdtMsKJ0pHDeb6It/JyQ+0NHlWPoCAMzg1rTqMCQEkcIXqnIbqsaVeXDpffKxnBOB9qiIUKH0/v7iWM/CV04FPxEOKmux1L7WN72jeHLg1qLB30mpLOrv8oe+vXT9UTqaBTBWu6UO0e5eSDsbnOhS3Jsw5Br/7sFLrnercHVwweiOjVqeIWRh29eAColKSPUGd3G1d/4gWlOOxynPmCp4yM31N48D7Q4WK1ZxffJzQH2ctL8mgWxNoRIWWxRCKJNILxK6t7XKv+Vwl4yG85M9Y3t+ne8yUn4s0ZucJs47pgxkKImIRLZqk5QAzyXnXLjoOFAIIPjxwKQGUM1CAkzXcRtQb/qaua28blrZF3VLneXJEFiDG2QJ/26PESwEe1O4WROIHxXE+6uWzSMLT1dTdCKD4w6gI4+on8XnTvlTU4SB8bauD77TNLhofHFQeTry46R5b+nw8j/XhTznjWQxjjXoZ/JESz0jTAG9iCeLbDSiSYw0Rg2zM5FnvtMRw7oGEVahXbt1PxVkz7RFJmoJToEcCCbQmQOYzrGk3WJpSA3V/ELzWLetvcYlKC/2JaP1DJoNwxgd9HlnlZID2gDrH5qrSjpmSIghGwVPQD+tjorXbfM6A0RqvbCJbWb1eDJ65V+Q+mydBQduZyoLsGX5QkBuOWWxeS/PBShohwWi3PsOY2+PxlUH80djgh1Q1BhPJ9/OjwISH+3+gDECoiy9Pdu6fUnpEhYN1LE2+0a9HMqcIE94gOElKAwIygB7wS82D6A+LYuQhoE3kWCwJH9vkPUiXKJC3GaGU2sJVqi0P1c+SLNA2y0qShv0p/kRJBUA4Qaj9Y4TWy1mY2f5+meZ/tFzr6OPlYycWowLPqlJ8vqYORcTPx9a2O/D8glbAo0jjFEso/X3ufCX83P5MIz9NzoDJcjU9WWVSG9FGM3524RkFsslv/z8nb+AyaguuXZS+s7U6u/r41lqp+x19aWQWo6om6SgK/a20TbzsHcKAiwd2ZR0iRChJwymZrg=',
        latitude: '',
        longitude: '',
        gps: '',
      }),
    })
      .then(responseJson => responseJson.json())
      .then(response => {
        for (const key in response.payslip) {
          const element = response.payslip[key];
          this.state.monthList.push(element);
        }

        this.setState({});
        //console.log(this.state.monthList);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async Get_Piedata() {
    await fetch('http://104.211.160.16:89/api/fetchEmpDonutData', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          'XpUdZDm8T8neWIyjen2v5QYjDQ0LHg9Gb0sV8UFlbTH6/jgCdtMsKJ0pHDeb6It/JyQ+0NHlWPoCAMzg1rTqMCQEkcIXqnIbqsaVeXDpffKxnBOB9qiIUKH0/v7iWM/CV04FPxEOKmux1L7WN72jeHLg1qLB30mpLOrv8oe+vXT9UTqaBTBWu6UO0e5eSDsbnOhS3Jsw5Br/7sFLrnercHVwweiOjVqeIWRh29eAColKSPUGd3G1d/4gWlOOxynPmCp4yM31N48D7Q4WK1ZxffJzQH2ctL8mgWxNoRIWWxRCKJNILxK6t7XKv+Vwl4yG85M9Y3t+ne8yUn4s0ZucJs47pgxkKImIRLZqk5QAzyXnXLjoOFAIIPjxwKQGUM1CAkzXcRtQb/qaua28blrZF3VLneXJEFiDG2QJ/26PESwEe1O4WROIHxXE+6uWzSMLT1dTdCKD4w6gI4+on8XnTvlTU4SB8bauD77TNLhofHFQeTry46R5b+nw8j/XhTznjWQxjjXoZ/JESz0jTAG9iCeLbDSiSYw0Rg2zM5FnvtMRw7oGEVahXbt1PxVkz7RFJmoJToEcCCbQmQOYzrGk3WJpSA3V/ELzWLetvcYlKC/2JaP1DJoNwxgd9HlnlZID2gDrH5qrSjpmSIghGwVPQD+tjorXbfM6A0RqvbCJbWb1eDJ65V+Q+mydBQduZyoLsGX5QkBuOWWxeS/PBShohwWi3PsOY2+PxlUH80djgh1Q1BhPJ9/OjwISH+3+gDECoiy9Pdu6fUnpEhYN1LE2+0a9HMqcIE94gOElKAwIygB7wS82D6A+LYuQhoE3kWCwJH9vkPUiXKJC3GaGU2sJVqi0P1c+SLNA2y0qShv0p/kRJBUA4Qaj9Y4TWy1mY2f5+meZ/tFzr6OPlYycWowLPqlJ8vqYORcTPx9a2O/D8glbAo0jjFEso/X3ufCX83P5MIz9NzoDJcjU9WWVSG9FGM3524RkFsslv/z8nb+AyaguuXZS+s7U6u/r41lqp+x19aWQWo6om6SgK/a20TbzsHcKAiwd2ZR0iRChJwymZrg=',
        latitude: '',
        longitude: '',
        gps: '',
        payslipMonth: 'Apr-2021',
      }),
    })
      .then(responseJson => responseJson.json())
      .then(response => {
        this.setState({
          graphicData: [
            {y: response.Doughnut.Gross},
            {y: response.Doughnut.Deduction},
            {y: response.Doughnut.TakeHome},
          ],
        });
        //console.log(response.Doughnut.Gross);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async Get_Cummulativedata() {
    await fetch('http://104.211.160.16:89/api/FetchEmpCumulativeData', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          'N+PljXxoRIVbDuSwBuwAomHKWpngj9MPLGSU2PCeHeTefCbqf/mmcQMnNeKzNYB6H3aBy3YgAAiKzMTQmNYuGGriwgLsSAsEilOR4t6G0JgJxcZ1UG94j3TSWZ+NtOFi9pr25dOz6DfTNP4FFXhNQEGxQT/Ked62x18+KuPMslR5d7YRK/fflX7MXZTCYhBgR0ON/4EOQnYik5QqcPDA2CJAAwtHg7rh0b51RJZJkBU6lGA7HqJ2CZqi5T/gZqLIz47FIm/gAbcNld/Y3EpsttQiZ1mkm8ACunjsV1JTx7VKBVB5yi1TsZf+1PYm23mdKz4IDYiPZBqnFa/19dQChlY0QfmSkOTh5eIU23lFjaPfsVNAanekcKyWFF7FMXy4oeuEg2pAZB2lN4BJIxtG3AVCiMRff+Wq611SWYFRg2xl/1u07mcPgx+XdGw+6vNiaWyRhHC6BgQG2OJQfJ1THRS/8MGUf40aw4tsSVrpCL72Lcb35dIsocb65N/NfAh5LEUK+5IFjF36HpOndZPbibGdDDmSYWzudAtRPqikD6Kw0Xtm9UuOug/IMP8dULIQFjhFywLXtRUclM3HFZtNOyl9SCb6yxOBv+Ha4kQmrUuL9PVNzAOujFcdzsKsRq3/2cyU6Bz4T5xjHDy6k/OrRnipPf/Ra5zX/kb6nZdXO5uijwboHCzOpGtXmovEu4fgtfkK2uYVElHzR7JYqLgejPKuY4upB2g2AJZif5FQLfjUsFDALsE39fO3B4VfhROC4ltxtDKRYNRsvq9Sr8GGxBGu4fiaBM0TLBaefHvQfm0X7JQcyR6oYC+YNBUuGXgSSEnGeyjcrIOCBAafXeDjP7BNa3uxcjhi5FgWSMSmmvgkaTbf3+n0P4XmVpRo6big3195jflP7Hp5x8N4DHgsxaHOe8anIuDOR31luH3pL9RX9e83WHI6sWxlokrdfe8i',
        latitude: '',
        longitude: '',
        gps: '',
        payslipMonth: 'Apr-Jun',
      }),
    })
      .then(responseJson => responseJson.json())
      .then(response => {
        for (var i; i < response.Cumulative_data.CTC.length; i++) {
          this.state.ctc.push({
            CTC: response.Cumulative_data.CTC[i].GraphValue,
            Gross: response.Cumulative_data.Gross[i].GraphValue,
            TakeHome: response.Cumulative_data.TakeHome[i].GraphValue,
            TaxDeduction: response.Cumulative_data.TaxDeduction[i].GraphValue,
          });
        }

        /*  for (const key in response.Cumulative_data.CTC) {
          const element = response.Cumulative_data.CTC[key];
          this.state.ctc.push({y: element.GraphValue});
        }

        for (const key in response.Cumulative_data.Gross) {
          const element = response.Cumulative_data.Gross[key];
          this.state.gross.push({y: element.GraphValue});
        }

         for (const key in response.Cumulative_data.TakeHome) {
          const element = response.Cumulative_data.TakeHome[key];
          this.state.takehome.push({y: element.GraphValue});
        }

        for (const key in response.Cumulative_data.TaxDeduction) {
          const element = response.Cumulative_data.TaxDeduction[key];
          this.state.taxdeduction.push({y: element.GraphValue});
        }*/

        //console.log(' c ' + this.state.ctc + ' g ' + this.state.gross);

        this.setState({});
        //console.log(this.state.monthList);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async Get_SavingDeclarationData() {
    await fetch('http://104.211.160.16:89/api/FetchSavingsData', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          'N+PljXxoRIVbDuSwBuwAomHKWpngj9MPLGSU2PCeHeTefCbqf/mmcQMnNeKzNYB6H3aBy3YgAAiKzMTQmNYuGGriwgLsSAsEilOR4t6G0JgJxcZ1UG94j3TSWZ+NtOFi9pr25dOz6DfTNP4FFXhNQEGxQT/Ked62x18+KuPMslR5d7YRK/fflX7MXZTCYhBgR0ON/4EOQnYik5QqcPDA2CJAAwtHg7rh0b51RJZJkBU6lGA7HqJ2CZqi5T/gZqLIz47FIm/gAbcNld/Y3EpsttQiZ1mkm8ACunjsV1JTx7VKBVB5yi1TsZf+1PYm23mdKz4IDYiPZBqnFa/19dQChlY0QfmSkOTh5eIU23lFjaPfsVNAanekcKyWFF7FMXy4oeuEg2pAZB2lN4BJIxtG3AVCiMRff+Wq611SWYFRg2xl/1u07mcPgx+XdGw+6vNiaWyRhHC6BgQG2OJQfJ1THRS/8MGUf40aw4tsSVrpCL72Lcb35dIsocb65N/NfAh5LEUK+5IFjF36HpOndZPbibGdDDmSYWzudAtRPqikD6Kw0Xtm9UuOug/IMP8dULIQFjhFywLXtRUclM3HFZtNOyl9SCb6yxOBv+Ha4kQmrUuL9PVNzAOujFcdzsKsRq3/2cyU6Bz4T5xjHDy6k/OrRnipPf/Ra5zX/kb6nZdXO5uijwboHCzOpGtXmovEu4fgtfkK2uYVElHzR7JYqLgejPKuY4upB2g2AJZif5FQLfjUsFDALsE39fO3B4VfhROC4ltxtDKRYNRsvq9Sr8GGxBGu4fiaBM0TLBaefHvQfm0X7JQcyR6oYC+YNBUuGXgSSEnGeyjcrIOCBAafXeDjP7BNa3uxcjhi5FgWSMSmmvgkaTbf3+n0P4XmVpRo6big3195jflP7Hp5x8N4DHgsxaHOe8anIuDOR31luH3pL9RX9e83WHI6sWxlokrdfe8i',
        latitude: '',
        longitude: '',
        gps: '',
        payslipMonth: 'Apr-Jun',
      }),
    })
      .then(responseJson => responseJson.json())
      .then(response => {
        this.setState({
          txtS80CDeclaration:
            '₹ ' + response.SavingsDeclaration.S80CDeclaration,
          txtCVIADeclaration:
            '₹ ' + response.SavingsDeclaration.CVIADeclaration,
          txtHRADeclaration: '₹ ' + response.SavingsDeclaration.HRADeclaration,
          txtHLIDeclaration: '₹ ' + response.SavingsDeclaration.HLIDeclaration,

          txtS80CProof: '₹ ' + response.SavingsDeclaration.S80CProof,
          txtCVIAProof: '₹ ' + response.SavingsDeclaration.CVIAProof,
          txtHRAProof: '₹ ' + response.SavingsDeclaration.HRAProof,
          txtHLIProof: '₹ ' + response.SavingsDeclaration.HLIProof,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  async GetFBPDeclaration() {
    await fetch('http://104.211.160.16:89/api/FetchFBPData', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          'N+PljXxoRIVbDuSwBuwAomHKWpngj9MPLGSU2PCeHeTefCbqf/mmcQMnNeKzNYB6H3aBy3YgAAiKzMTQmNYuGGriwgLsSAsEilOR4t6G0JgJxcZ1UG94j3TSWZ+NtOFi9pr25dOz6DfTNP4FFXhNQEGxQT/Ked62x18+KuPMslR5d7YRK/fflX7MXZTCYhBgR0ON/4EOQnYik5QqcPDA2CJAAwtHg7rh0b51RJZJkBU6lGA7HqJ2CZqi5T/gZqLIz47FIm/gAbcNld/Y3EpsttQiZ1mkm8ACunjsV1JTx7VKBVB5yi1TsZf+1PYm23mdKz4IDYiPZBqnFa/19dQChlY0QfmSkOTh5eIU23lFjaPfsVNAanekcKyWFF7FMXy4oeuEg2pAZB2lN4BJIxtG3AVCiMRff+Wq611SWYFRg2xl/1u07mcPgx+XdGw+6vNiaWyRhHC6BgQG2OJQfJ1THRS/8MGUf40aw4tsSVrpCL72Lcb35dIsocb65N/NfAh5LEUK+5IFjF36HpOndZPbibGdDDmSYWzudAtRPqikD6Kw0Xtm9UuOug/IMP8dULIQFjhFywLXtRUclM3HFZtNOyl9SCb6yxOBv+Ha4kQmrUuL9PVNzAOujFcdzsKsRq3/2cyU6Bz4T5xjHDy6k/OrRnipPf/Ra5zX/kb6nZdXO5uijwboHCzOpGtXmovEu4fgtfkK2uYVElHzR7JYqLgejPKuY4upB2g2AJZif5FQLfjUsFDALsE39fO3B4VfhROC4ltxtDKRYNRsvq9Sr8GGxBGu4fiaBM0TLBaefHvQfm0X7JQcyR6oYC+YNBUuGXgSSEnGeyjcrIOCBAafXeDjP7BNa3uxcjhi5FgWSMSmmvgkaTbf3+n0P4XmVpRo6big3195jflP7Hp5x8N4DHgsxaHOe8anIuDOR31luH3pL9RX9e83WHI6sWxlokrdfe8i',
        latitude: '',
        longitude: '',
        gps: '',
        payslipMonth: 'Apr-Jun',
      }),
    })
      .then(responseJson => responseJson.json())
      .then(response => {
        for (const key in response.FBPData.FBP) {
          const element = response.FBPData.FBP[key];
          this.state.fpbdecllist.push(element);
        }
        this.setState({});
        //console.log(this.state.fpbdecllist);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <View style={styles.screen}>
            <Text style={styles.headingtop}>Pick your Tax Option</Text>
            <View style={styles.headerview}>
              <View style={styles.column}>
                <LinearGradient
                  colors={['#6484E3', '#4ac0d1']}
                  style={styles.linearGradient}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.startText}>Old Tax Regime</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <View style={styles.space} />
                <TouchableOpacity onPress={login}>
                  <Text style={styles.startText} />
                </TouchableOpacity>
              </View>
              <View style={styles.column}>
                <LinearGradient
                  colors={['#6484E3', '#4ac0d1']}
                  style={styles.linearGradient}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.startText}>New Tax Regime</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <View style={styles.space} />
                <TouchableOpacity>
                  <Text style={{color: '#6484E3', fontSize: 12}}>
                    Check out your tax
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cardview}>
              <Picker
                style={{marginLeft: 4, marginRight: 4}}
                selectedValue={this.state.selectedmonth}
                onValueChange={(itemValue, itemIndex) => {
                  /* this.setState(
                  {
                    selectedHead: itemValue.PayHead,
                  } 
                  () =>
                    this.fetch_dcl_amt(this.state.monthList[itemIndex].PayHead),,
                ) */
                }}>
                {this.state.monthList.map((item, key) => (
                  <Picker.Item
                    label={item.PaySlipMonth}
                    value={item.PaySlipMonth}
                    key={key}
                  />
                ))}
              </Picker>
              <View style={styles.row}>
                <VictoryPie
                  animate={{easing: 'exp'}}
                  theme={VictoryTheme.material}
                  data={this.state.graphicData}
                  labels={({datum}) => datum.y}
                  style={{
                    labels: {fill: 'black', fontSize: 10, fontWeight: 'bold'},
                  }}
                  padding={{top: 20, bottom: 80}}
                  //padAngle={({datum}) => datum.y}
                  //labelComponent={<VictoryLabel angle={45} />}
                  width={230}
                  height={230}
                  colorScale={this.state.graphicColor}
                  innerRadius={40}
                />
                <View style={styles.columnpie}>
                  <View style={styles.row}>
                    <Text
                      style={{
                        height: 10,
                        width: 10,
                        marginTop: 4,
                        backgroundColor: '#6484E3',
                      }}></Text>
                    <Text style={{fontSize: 11}}> Gross</Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={{
                        height: 10,
                        width: 10,
                        marginTop: 4,
                        backgroundColor: '#00BFFF',
                      }}></Text>
                    <Text style={{fontSize: 12}}> Deduction</Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={{
                        height: 10,
                        width: 10,
                        marginTop: 4,
                        backgroundColor: '#1fde99',
                      }}></Text>
                    <Text style={{fontSize: 12}}> TakeHome</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.space} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View style={styles.column}>
                <TouchableOpacity style={styles.roundedButton}>
                  <Text style={styles.buttonText}>Pay slip </Text>
                  <Image source={logo} style={{width: 20, height: 20}} />
                </TouchableOpacity>
              </View>
              <View style={styles.column}>
                <TouchableOpacity style={styles.roundedButton}>
                  <Text style={styles.buttonText}>Tax Sheet </Text>
                  <Image source={logo} style={{width: 20, height: 20}} />
                  <View />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.space} />
            <View style={styles.cardviewnext}>
              <View>
                <SelectDropdown
                  data={this.state.paymonthlist}
                  onSelect={(selectedItem, index) => {
                    //console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              </View>
              <View>
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryArea
                    style={{
                      data: {
                        fill: '#6484E3',
                        fillOpacity: 0.7,
                        stroke: '#6484E3',
                        strokeWidth: 3,
                      },
                      labels: {
                        fontSize: 15,
                        fill: ({datum}) =>
                          datum.x === 3 ? '#000000' : '#6484E3',
                      },
                    }}
                    padding={{top: 20, bottom: 50}}
                    height={250}
                    // colorScale={this.state.graphicAreaColor}
                    data={this.state.CTC}
                    interpolation="natural"
                    animate={{
                      duration: 2000,
                      onLoad: {duration: 1000},
                    }}
                  />
                </VictoryChart>
                <View style={styles.rowarea}>
                  <View style={styles.row}>
                    <Text
                      style={{
                        height: 10,
                        width: 10,
                        marginTop: 4,
                        backgroundColor: '#6484E3',
                      }}></Text>
                    <Text style={{fontSize: 11}}> CTC </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={{
                        height: 10,
                        width: 10,
                        marginTop: 4,
                        backgroundColor: '#00BFFF',
                      }}></Text>
                    <Text style={{fontSize: 12}}> Gross </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={{
                        height: 10,
                        width: 10,
                        marginTop: 4,
                        backgroundColor: '#1fde99',
                      }}></Text>
                    <Text style={{fontSize: 12}}> TakeHome </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={{
                        height: 10,
                        width: 10,
                        marginTop: 4,
                        backgroundColor: '#A80E6A',
                      }}></Text>
                    <Text style={{fontSize: 12}}> TaxDeduction </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.space} />
            <View>
              <View>
                <LinearGradient
                  colors={['#6484E3', '#4ac0d1']}
                  style={styles.linearGradient}>
                  <Text style={styles.headingtext}>
                    Saving Declaration 20-21
                  </Text>
                </LinearGradient>
              </View>
              <View style={styles.row}>
                <Text style={styles.textsp}>Exemption </Text>
                <Text style={styles.textsp}>Declred </Text>
                <Text style={styles.textsp}>Submitted </Text>
              </View>
              <View style={styles.txtspace}></View>
              <View>
                <View style={styles.row}>
                  <Text style={styles.text}>S80C Declaration</Text>
                  <Text style={styles.inputted}>
                    {this.state.txtS80CDeclaration}
                  </Text>
                  <Text style={styles.inputted}>--</Text>
                </View>
                <View style={styles.txtspace}></View>
                <View style={styles.row}>
                  <Text style={styles.text}>CVIA Declaration</Text>
                  <Text style={styles.inputted}>
                    {this.state.txtCVIADeclaration}
                  </Text>
                  <Text style={styles.inputted}>--</Text>
                </View>
                <View style={styles.txtspace}></View>

                <View style={styles.row}>
                  <Text style={styles.text}>HRA</Text>
                  <Text style={styles.inputted}>
                    {this.state.txtHRADeclaration}
                  </Text>
                  <Text style={styles.inputted}>--</Text>
                </View>
                <View style={styles.txtspace}></View>

                <View style={styles.row}>
                  <Text style={styles.text}>Housing loan</Text>
                  <Text style={styles.inputted}>
                    {this.state.txtHLIDeclaration}
                  </Text>
                  <Text style={styles.inputted}>--</Text>
                </View>
              </View>
            </View>
            <View style={styles.space} />
            <View>
              <View>
                <LinearGradient
                  colors={['#6484E3', '#4ac0d1']}
                  style={styles.linearGradient}>
                  <Text style={styles.headingtext}> FBP Declaration</Text>
                </LinearGradient>
              </View>
              <View style={styles.row}>
                <Text style={styles.textsp}>Flexible Benefit Plan</Text>
                <Text style={styles.textsp}>Decalared </Text>
                <Text style={styles.textsp}>Claimed </Text>
              </View>
              <View style={styles.row}>
                <FlatList
                  data={this.state.fpbdecllist}
                  renderItem={({item}) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <Text style={styles.textdata}>{item.PayHeadName}</Text>
                      <Text style={styles.textdata}>{item.DeclaredValue}</Text>
                      <Text style={styles.textdata}>{item.ClaimValue}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={styles.space} />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a1caf1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    backgroundColor: 'white',
    fontSize: 10,
    color: 'black',
  },

  btnIcon: {
    height: 25,
    width: 25,
  },
  picker: {
    fontSize: 10,
    marginVertical: 10,
    marginHorizontal: -10,
  },
  startText: {color: 'white', fontSize: 12, textAlign: 'center'},
  headtext: {color: '#6484E3', fontSize: 12, textAlign: 'left'},

  button: {
    justifyContent: 'center',
    borderRadius: 15,
    width: 120,
    height: 30,
    alignSelf: 'flex-end',
    fontSize: 8,
    //backgroundColor: '#6484E3',
  },
  roundedButton: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 55,
    backgroundColor: 'white',
    borderRadius: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    flexDirection: 'row',
  },
  cardview: {
    display: 'flex',
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    height: 220,
  },
  cardviewnext: {
    display: 'flex',
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {color: '#6484E3', fontWeight: '800', fontSize: 14},
  header: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 10,
    marginTop: 80,
    width: 380,
    height: 200,
    backgroundColor: '#e9ffdb',
  },
  screen: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 10,
    marginLeft: 5,
    width: 400,
    backgroundColor: 'white',
  },
  thereinto: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 10,
    marginTop: 5,
    width: 360,
    height: 130,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'column',
  },
  headerview: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 5,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 6,
  },
  heading: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 25,
    width: 360,
    backgroundColor: '#a1caf1',
    marginLeft: 10,
  },
  headingtext: {
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'left',
    color: 'white',
    // backgroundColor: '#6484E3',
  },
  headingtop: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'left',
    color: '#6484E3',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 2,
  },
  columnpie: {
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  rowarea: {
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  txtspace: {
    width: 5,
    height: 4,
  },
  space: {
    width: 15,
    height: 15,
  },
  imgBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
  },
  text: {
    marginTop: 10,
    flex: 1,
    color: 'black',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  inputted: {
    //marginTop: 10,
    flex: 1,
    color: 'grey',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'left',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#e6e6fa',
    height: 28,
  },
  textsp: {
    flex: 1,
    marginTop: 10,
    color: '#6484e3',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  textdata: {
    marginTop: 10,
    color: 'black',
    fontSize: 11,
    fontWeight: 'normal',
    textAlign: 'left',
    borderRadius: 10,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flex: 1,
  },
  inputtedsp: {
    flex: 1,
    marginTop: 10,
    color: 'black',
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'left',
    borderRadius: 10,
    backgroundColor: '#e6e6fa',
  },
});

export default App;
