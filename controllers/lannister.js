const FeeConfig = require("../models/feeConfig");

//FEE SETUP ENDPOING- POST
exports.createPost = (req, res, next) => {
    const { FeeConfigurationSpec } = req.body
    const configArray = FeeConfigurationSpec.split("\n")

    if (configArray.length === 0) res.status(200);

    const data = configArray.map(config=> {
    const [firstPart, secondPart,feeValue2=0] =config.replace("(", " ").replace(")", " ").split(":")

    const [feeId, currency, locale, feeEntity, entityProperty] = firstPart.split(" ")
    const [, ,feeType, feeValue] = secondPart.split(" ")
    return {
            feeId,
            currency,
            locale, 
            feeEntity,
            entityProperty,
            feeType,
            feeValue,
            feeValue2
            }
        })
    //SAVE FEE CONFIG SPECS TO DATABASE
    FeeConfig.create(data, (err, configData) => {
        res.status(200).json({
            "status": "ok"
        });
    })    
}

//FEE COMPUTATION ENDPOINT- GET
exports.getPost = (req, res, next) => {
    //SEND BACK OK
    res.status(200);

    //RECEIVE PAYLOAD DATA
    const newPayload = {
        id : req.body.ID,
        amount : req.body.Amount,
        currency : req.body.Currency,
        currencyCountry : req.body.CurrencyCountry,
        customer: {
            id : req.body.Customer.ID,
            emailAddress : req.body.Customer.EmailAddress,
            fullName : req.body.Customer.FullName,
            bearsFee : req.body.Customer.BearsFee,
        },
        paymentEntity: {
            id : req.body.PaymentEntity.ID,
            issuer : req.body.PaymentEntity.Issuer,
            brand : req.body.PaymentEntity.Brand,
            number : req.body.PaymentEntity.Number,
            sixID : req.body.PaymentEntity.SixID,
            type :req.body.PaymentEntity.Type,
            country : req.body.PaymentEntity.Country
        }          
    }

    //console.log(newPayload.paymentEntity.entityProperty);

    //DETERMINE TRANSACTION LOCALE
    let locale;
    if(newPayload.currencyCountry === newPayload.paymentEntity.country){
        locale = "LOCL"
    } else{locale = "INTL"}

    
    //QUERY DATABASE
    FeeConfig.find(
        {$or:[
                //x111a
                {   
                    currency: newPayload.currency,
                    locale: locale,
                    feeEntity: newPayload.paymentEntity.type,
                    entityProperty : newPayload.paymentEntity.id,
                    },
                    //x111b 
                    {   
                        currency: newPayload.currency,
                        locale: locale,
                        feeEntity: newPayload.paymentEntity.type,
                        entityProperty : newPayload.paymentEntity.issuer,
                        },
                        //x111c
                        {   
                            currency: newPayload.currency,
                            locale: locale,
                            feeEntity: newPayload.paymentEntity.type,
                            entityProperty : newPayload.paymentEntity.brand,
                            },
                            //x111d
                            {   
                                currency: newPayload.currency,
                                locale: locale,
                                feeEntity: newPayload.paymentEntity.type,
                                entityProperty : newPayload.paymentEntity.number,
                                },
                                //x111e 
                                {   
                                    currency: newPayload.currency,
                                    locale: locale,
                                    feeEntity: newPayload.paymentEntity.type,
                                    entityProperty : newPayload.paymentEntity.sixID,
                                    }, 
                //x110
                {
                    currency: newPayload.currency,
                    locale: locale,
                    feeEntity: newPayload.paymentEntity.type,
                    entityProperty : "*",
                    },
                //x101a
                {   
                    currency: newPayload.currency,
                    locale: locale,
                    feeEntity: "*",
                    entityProperty : newPayload.paymentEntity.id,
                    },
                    //x101b
                    {   
                        currency: newPayload.currency,
                        locale: locale,
                        feeEntity: "*",
                        entityProperty : newPayload.paymentEntity.issuer,
                        },
                        //x101c
                        {   
                            currency: newPayload.currency,
                            locale: locale,
                            feeEntity: "*",
                            entityProperty : newPayload.paymentEntity.brand,
                            },
                            //x101d
                            {   
                                currency: newPayload.currency,
                                locale: locale,
                                feeEntity: "*",
                                entityProperty : newPayload.paymentEntity.number,
                                },
                                //x101e
                                {   
                                    currency: newPayload.currency,
                                    locale: locale,
                                    feeEntity: "*",
                                    entityProperty : newPayload.paymentEntity.sixID,
                                    },
                //x100
                {   
                    currency: newPayload.currency,
                    locale: locale,
                    feeEntity: "*",
                    entityProperty : "*",
                    }, 
                //x011a
                {
                    currency: newPayload.currency,
                    locale: "*",
                    feeEntity: newPayload.paymentEntity.type,
                    entityProperty : newPayload.paymentEntity.id,
                    },
                    //x011b
                    {
                        currency: newPayload.currency,
                        locale: "*",
                        feeEntity: newPayload.paymentEntity.type,
                        entityProperty : newPayload.paymentEntity.issuer,
                        },
                        //x011c
                        {
                            currency: newPayload.currency,
                            locale: "*",
                            feeEntity: newPayload.paymentEntity.type,
                            entityProperty : newPayload.paymentEntity.brand,
                            },
                            //x011d
                            {
                                currency: newPayload.currency,
                                locale: "*",
                                feeEntity: newPayload.paymentEntity.type,
                                entityProperty : newPayload.paymentEntity.number,
                                },
                                //x011e
                                {
                                    currency: newPayload.currency,
                                    locale: "*",
                                    feeEntity: newPayload.paymentEntity.type,
                                    entityProperty : newPayload.paymentEntity.sixID,
                                    },
                //x010
                {   
                    currency: newPayload.currency,
                    locale: "*",
                    feeEntity: newPayload.paymentEntity.type,
                    entityProperty : "*",
                    }, 
                //x001a
                {   
                    currency: newPayload.currency,
                    locale: "*",
                    feeEntity: "*",
                    entityProperty : newPayload.paymentEntity.id,
                    },
                    //x101b
                    {   
                        currency: newPayload.currency,
                        locale: "*",
                        feeEntity: "*",
                        entityProperty : newPayload.paymentEntity.issuer,
                        },
                        //x101c
                        {   
                            currency: newPayload.currency,
                            locale: "*",
                            feeEntity: "*",
                            entityProperty : newPayload.paymentEntity.brand,
                            },
                            //x101d
                            {   
                                currency: newPayload.currency,
                                locale: "*",
                                feeEntity: "*",
                                entityProperty : newPayload.paymentEntity.number,
                                },
                                //x101e
                                {   
                                    currency: newPayload.currency,
                                    locale: "*",
                                    feeEntity: "*",
                                    entityProperty : newPayload.paymentEntity.sixID,
                                    },
                //x000
                {   
                    currency: newPayload.currency,
                    locale: "*",
                    feeEntity: "*",
                    entityProperty : "*",
                    }
            ]
        } 
        ,(err,Config) => {
        
        if(Config.length == 0){
            if(newPayload.currency !== "NGN"){
                return res.status(201).json({
                    "Error": "No fee configuration for " + newPayload.currency + " transactions"
                })
            }
            else{
                return res.status(205).json({
                    "Error": "No fee confiuration for transaction"
                })
            }
        };   
        
        //COMPUTE AppliedFeeValue
        if(Config[Config.length-1].feeType === "PERC"){
            feeVal = Config[Config.length-1].feeValue/100 * newPayload.amount;
        }
        else if(Config[Config.length-1].feeType === "FLAT"){
            feeVal = Config[Config.length-1].feeValue;
        }
        else{
            feeVal = Config[Config.length-1].feeValue + (Config[Config.length-1].feeValue2/100 * newPayload.amount)
        }
        //COMPUTE ChargeAmount
        if(newPayload.customer.bearsFee){
            ChargeAmount = feeVal + newPayload.amount
        }else{
            ChargeAmount = newPayload.amount;
        }


        //API OUTPUT
        res.status(200).json({
            "AppliedFeeID": Config[Config.length-1].feeId,
            "AppliedFeeValue": Math.round(feeVal),
            "ChargeAmount": ChargeAmount,
            "SettlementAmount": ChargeAmount - feeVal
        })
    })
}


