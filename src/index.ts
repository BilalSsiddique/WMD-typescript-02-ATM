#!/usr/bin/env node
import chalk from 'chalk'
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer'
import CheckboxPrompt from 'inquirer/lib/prompts/checkbox';
import {createSpinner} from 'nanospinner'

let availableBalance = Math.round(Math.random()*1000)
let userObj = {userId:'',userPin:0,availableBalance}

const wait = ()=> {
    return new Promise((res)=>{
        setTimeout(res,2000);
    })
}
async function welcome(){
    const gameTitle= chalkAnimation.karaoke('TYPESCRIPT PROJECT-05 ATM ')
    await wait()
    gameTitle.stop()


    console.log(`
    ${chalk.magentaBright(` HOW TO USE" `)}
      ${chalk.yellowBright(`
      ${chalk.bgRgb(5,2,6)('1)')} INPUT YOUR USER ID AND PIN
      ${chalk.bgRgb(5,2,6)('2)')} SELECT FROM GIVEN OPTIONS`)} 
      ${chalk.magentaBright('DONE!')}`)
}

function balanceInquiry(){
    console.log(` 
    Account Details:`)
        console.log(`${chalk.magentaBright(`
        User Id :           ${userObj.userId}
        Available Balance : ${userObj.availableBalance}
    `)}`)
}
function validation(id:string,pin:number ):void{
    const regex=/^[a-zA-Z]+$/;
    if (!id.match(regex)) throw { TypeError:'Type of Id must be string'}
    if (typeof pin !=='number') throw { TypeError:'Type of Pin must be number'}
    const pinLen= Math.ceil(Math.log10(pin )) 
    if (pinLen!==4) throw { PinError:'Pin length should be 4'}      
}
async function main(){
    const getUserId = await inquirer.prompt({
        name: 'userId',
        type:'input',
        message: 'Enter user Id: ',
        default(){
            return 'Id'
        }
    }) 
    const getUserPin = await inquirer.prompt({
        name: 'userPin',
        type:'input',
        message: 'Enter user Pin: ',
        default(){
            return 'Pin'
        }
    })

    userObj.userId=getUserId.userId
    userObj.userPin = +getUserPin.userPin
    // console.log(userObj.userId,userObj.userPin)
    // validation(userObj.userId,userObj.userPin).catch((err)=> console.log(err))
    try {
        validation(userObj.userId,userObj.userPin) 
    } catch (error) {
        console.log(error)
        main()
    }
    
    const atmOptions = await inquirer.prompt({
        name: 'atmOption',
        type:'list',
        message: 'Choose from the Given Options: ',
        choices:["Withdrawl",'Balance_Enquiry','Deposit']
    })

    console.log(atmOptions.atmOption)
    



}



await welcome()
await main()