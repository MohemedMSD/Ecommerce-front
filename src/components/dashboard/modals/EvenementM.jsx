import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { DriversCom, ExtrasCom, GuidesCom, Restauration, Services } from '../..'
import Axios from '../../../assets/constants/axios/axios'


const EvenementM = ({
  closeModal, 
  header, 
  Evenement, 
  action, 
  setEvenements, 
  Evenements,
  setSearchQuery,
  setInSearch,
  setReload,
  setSearchInfo,
  setcurrentPage,
  setEnd_date,
  setStart_date
}) => {
    
    // event information
    const [Ref, setRef] = useState('');
    const [ErrRef, setErrRef] = useState('');

    const [Real_D, setReal_D] = useState('');
    const [ErrReal_D, setErrReal_D] = useState('');

    const [Modify_D, setModify_D] = useState('');
    const [ErrModify_D, setErrModify_D] = useState('');

    const [Cancel_D, setCancel_D] = useState('');
    const [ErrCancel_D, setErrCancel_D] = useState('');

    const [Num_Pers, setNum_Pers] = useState(0);
    const [ErrNum_Pers, setErrNum_Pers] = useState('');

    const [activite, setactivite] = useState('')
    const [Erractivite, setErractivite] = useState()

    const [Num_Pers_Vegitarian, setNum_Pers_Vegitarian] = useState(0);
    const [ErrNum_Pers_Vegitarian, setErrNum_Pers_Vegitarian] = useState('');

    // restauration info
    const [Labor, setLabor] = useState(0);

    const [Purchasing, setPurchasing] = useState(0);
    const [ErrPurchasing, setErrPurchasing] = useState('');
    
    const [Repas, setRepas] = useState(0);
    const [ErrRepas, setErrRepas] = useState('');

    const [TP_Event, setTP_Event] = useState(0);
    const [facture_price_restauration, setFacture_price_restauration] = useState(0)
    const [Benefit_restauration, setBenefit_restauration] = useState(0)

    // drivers
    const [Drivers, setDrivers] = useState([{
      id : 1,
      name : '',
      price : 0,
      phone : '',
      err : ''
    }])
    const [TotalDrivers, setTotalDrivers] = useState(0)
    const [facture_price_drivers, setFacture_price_drivers] = useState(0)
    const [Benefit_drivers, setBenefit_drivers] = useState(0)

    // guides
    const [Guides, setGuides] = useState([{
      id : 1,
      name : '',
      price : 0,
      type : '',
      phone : '',
      err : []
    }])
    const [TotalGuides, setTotalGuides] = useState(0)
    const [facture_price_guides, setFacture_price_guides] = useState(0)
    const [Benefit_guides, setBenefit_guides] = useState(0)

    // services information
    const [services, setServices] = useState([
      {
        id : 1, 
        service_id: null, 
        service : '', 
        origin_price : 0, 
        facture_price : 0, 
        benefit : 0, 
        is_price_per_pers : 1, 
        num_pers : Num_Pers, 
        price_per_pers : 0,
        facture_price_per_pers : 0, 
        err : ''}
    ])
    const [TotalServices, setTotalServices] = useState(0)
    const [facture_price_services, setFacture_price_services] = useState(0)
    const [Benefit_services, setBenefit_services] = useState(0)
    const [Facture_P_HT, setFacture_P_HT] = useState(0)
    
    // extras information
    const [Extras, setExtras] = useState([
      {id : 1, extra_id : null, name : '', price: 0, err : ''}
    ])
    const [Total_Extras, setTotal_Extras] = useState(0)

    // Financial results
    const [NetPrice, setNetPrice] = useState(0);
    const [TVAPrice, setTVAPrice] = useState(0);
    const [TotalPrice, setTotalPrice] = useState(0);
    const [Benefit_total, setBenefit_total] = useState(0)
    
    // visiblity of drivers, guides, services
    const [DriversVis, setDriversVis] = useState(false)
    const [GuidesVis, setGuidesVis] = useState(false)
    const [ServicesVis, setServicesVis] = useState(false)
    const [RestaurationVis, setRestaurationVis] = useState(false)
    const [ExtrasVis, setExtrasVis] = useState(false)

    const [InProgress, setInProgress] = useState(false)
    
    // add item for driver, guide, service or extra
    const AddGuideAndDriverAndService = (action, e) => {
      e.preventDefault()

      if (action === 'driver') {
        setDrivers([...Drivers, {id : Drivers.length + 1, name : '', price : 0, phone: '', err : ''}])
      }

      if (action === 'guide') {
        setGuides([...Guides, {id : Guides.length + 1, name : '', price : 0, phone: '', err : '', type : ''}])
      }

      if (action === 'service') {
        setServices([...services, 
          {
            id : services.length + 1, 
            service_id: null, 
            service : '', 
            origin_price : 0, 
            facture_price : 0, 
            benefit : 0, 
            is_price_per_pers : 1, 
            num_pers : Num_Pers, 
            price_per_pers : 0, 
            facture_price_per_pers: 0, 
            err : ''
          }
        ])
      }

      if (action === 'extras') {
        setExtras([...Extras, {id : Extras.length + 1, name : '', price : 0, extra_id : null, err : ''}])
      }

    }

    // calcul price total for each service, driver, guide or extra
    const calculDriversAndGuidesAndServicesPrice = () => {
      
      let totalDriversPrice = 0;
      let totalGuidesPrice = 0;
      let totalServicesPrice = 0;

      Drivers.length > 0 && Drivers?.forEach((item) => {

        if (item?.price != 0) {
          totalDriversPrice += parseFloat(item?.price || 0)
        }

      })

      Guides.length > 0 && Guides?.forEach((item) => {

        if (item?.price != 0) {
          totalGuidesPrice += parseFloat(item?.price || 0)
        }

      })

      services.length > 0 && services?.forEach((item) => {

        if (item?.price_per_pers != 0) {
          totalServicesPrice += parseFloat(item?.origin_price || 0)
        }

      })

      setTotalGuides(parseFloat(totalGuidesPrice))
      setTotalDrivers(parseFloat(totalDriversPrice))
      setTotalServices(parseFloat(totalServicesPrice))


    }

    // remove item for driver, guide, service or extra
    const removeDriversAndGuidesAndServices = (action, id) => {

      if (action == 'driver') {

        let selectedDriver = Drivers.filter((item) => {
          return item.id == id
        })

        if (Drivers.length === 1) {
          
          setTotalDrivers(0)
          setFacture_price_drivers(0)
          selectedDriver[0] = {
            id : 1,
            name : '',
            price : 0,
            phone : '',
            err : ''
          }
          
          setDrivers(selectedDriver)

        }else {
          
          setTotalDrivers((pre) => pre - parseFloat(selectedDriver[0].price || 0))

          let id = 0;
          const newArray = Drivers.map((item) => {

            if(item.id != selectedDriver[0].id){

              id++
              return {
                ...item,
                id : id
              }

            }

          })

          setDrivers(newArray.filter(item => item != undefined))

        }
        

      }

      if (action == 'guide') {
        
        let selectedGuide = Guides.filter((item) => {
          return item.id == id
        })

        if (Guides.length === 1) {
          
          setTotalGuides(0)
          setFacture_price_guides(0)
          selectedGuide[0] = {
            id : 1,
            name : '',
            price : 0,
            err : [],
            phone : '',
            type : ''
          }
          setGuides(selectedGuide)

        }else {
          
          setTotalGuides((pre) => pre - parseFloat(selectedGuide[0].price || 0))

          let id = 0

          const newArray = Guides.map((item) => {

            if(item.id != selectedGuide[0].id){
              id++
              return {
                ...item,
                id : id
              }

            }

          })
          
          setGuides(newArray.filter(item => item != undefined))

        }
        

      }

      if (action == 'service') {

        let selectedService = services.filter((item) => {
          return item.id == id
        })

        if (services.length === 1) {
          
          setTotalServices(0)
          setFacture_price_services(0)
          setBenefit_services(0)
          selectedService[0] = {
            id : selectedService[0].id,  
            service_id: null, 
            service : '', 
            origin_price : 0, 
            facture_price : 0, 
            benefit : 0, 
            is_price_per_pers : 1, 
            num_pers : Num_Pers, 
            price_per_pers : 0, 
            facture_price_per_pers: 0, 
            err : ''
          }
          setServices(selectedService)

        }else {
          
          setTotalServices((pre) => pre - (selectedService[0].price || 0))
          setFacture_price_services((pre) => pre - (selectedService[0].facture_price || 0))

          let id = 0;
          const newArray = services.map((item) => {

            if(item.id != selectedService[0].id){
              id++
              return {
                ...item,
                id : id
              }
            }

          })

          setServices(newArray.filter(item => item != undefined))

        }
        

      }

      if (action == 'Extra') {
        
        let selectedExtra = Extras.filter((item) => {
          return item.id == id
        })
        
        if (Extras.length === 1) {

          setTotal_Extras(0)
          selectedExtra[0] ={id : 1, extra_id : null, name : '', price: 0, err : ""}
          setExtras(selectedExtra)

        }else {
          
          setTotal_Extras((pre) => pre - parseFloat(selectedExtra[0].price || 0))

          let id = 0
          const newArray = Extras.map((item) => {
            if(item.id != selectedExtra[0].id){
              id++
              return {
                ...item,
                id : id
              }
            }
          })

          setExtras(newArray.filter(item => item != undefined))

        }

      }

    }

    // fill the data in the form
    useEffect(() => {
      
      (async ()=>{
          
          if (action === 'update' || action === 'show' && Evenement) {
            
            setRef(Evenement?.Ref)
            setReal_D(Evenement?.real_date)
            setModify_D(Evenement?.modify_date)
            setCancel_D(Evenement?.cancellation_date)
            setNum_Pers(Evenement?.Persone_Number)
            setNum_Pers_Vegitarian(Evenement?.vegitarian)
            setactivite(Evenement?.activite)

            if (Evenement?.labor_per > 0 || Evenement?.repas_per || Evenement?.purchasing) {
              
              setPurchasing(Evenement.purchasing)
              setRepas(Evenement?.repas_per)
              setLabor(Evenement?.labor_per)
              setRestaurationVis(true)

            }

            const drivers = Evenement?.drivers?.map((item, index) => {
              return {
                id : index + 1,
                name : item.name,
                price : item.price,
                err : '',
                phone : item.phone
              }
            })

            const guides = Evenement?.guides?.map((item, index) => {
              return {
                id : index + 1,
                name : item.name,
                price : item.price,
                type : item.type,
                phone : item.phone,
                err : ''
              }
            })

            // this id for just management in front end for delete and update prices...
            let service_id_FE = 0;
            const Services = Evenement?.services?.map((item, index) => {

              if (item?.service == 'guides') {
                
                setTotalGuides(pre => pre + item?.origin_price)
                setFacture_price_guides(pre => pre + item?.facture_price)
                setBenefit_guides(pre => pre + item?.benefit)

              }

              setBenefit_total(pre => pre + item?.benefit)

              if (item?.service == 'drivers') {
                
                setTotalDrivers(pre => pre + item?.origin_price)
                setFacture_price_drivers(pre => pre + item?.facture_price)
                setBenefit_drivers(pre => pre + item?.benefit)

              }

              if (item?.service == 'restauration') {
                
                setTP_Event(pre => pre + item?.origin_price)
                setFacture_price_restauration(pre => pre + item?.facture_price)
                setBenefit_restauration(pre => pre + item?.benefit)

              }

              if (
                item?.service != 'restauration' &&
                item?.service != 'drivers' &&
                item?.service != 'guides'
              ) {
                
                service_id_FE++
                setTotalServices(pre => item?.price_per_pers ? pre + (item?.num_pers * item?.origin_price) : pre + item?.origin_price)
                setFacture_price_services(pre => pre + item?.facture_price)
                setBenefit_services(pre => pre + item?.benefit)

                return {
                  id : service_id_FE,
                  service : item?.service,
                  service_id : item?.id || null,
                  origin_price : item?.origin_price || 0,
                  facture_price : item?.facture_price || 0,
                  benefit : item?.benefit || 0,
                  num_pers : item?.num_pers,
                  price_per_pers : (item?.price_per_pers ? item?.origin_price / item?.num_pers : item?.origin_price) || 0,
                  is_price_per_pers : item?.price_per_pers,
                  facture_price_per_pers : (item?.price_per_pers ? item?.facture_price / item?.num_pers : item?.facture_price) || 0,
                  err : ''
                }

              }

            })

            const Extras = Evenement?.extras?.map((item, index) => {
              setTotal_Extras(pre => pre + item?.price)
              return {
                id : index + 1,
                name : item?.name,
                price : item?.price,
                extra_id : item?.id,
                err : ''
              }
            })

            if (drivers.length > 0) {

              setDrivers(drivers)
              setDriversVis(true)
              
            }

            if (guides.length > 0) {

              setGuides(guides)
              setGuidesVis(true)
              
            }
            
            if (Services.filter(item => item != undefined).length > 0) {
              
              setServices(Services.filter(item => item != undefined))
              setServicesVis(true)

            }

            if (Extras.length > 0) {
              setExtras(Extras)
              setExtrasVis(true)
            }

          }

      })()

    }, [])

    // calcul prices 
    useEffect(() => {

      // calcul price total for restauration
      setTP_Event((parseFloat(Labor || 0) * parseFloat(Num_Pers || 0)) + parseFloat(Purchasing  || 0) + (parseFloat(Repas || 0) * parseFloat(Num_Pers || 0)))
      
      // calcul benefit in change facture price
      if (facture_price_restauration >= 0) {
        setBenefit_restauration(
          Math.round((facture_price_restauration - TP_Event) * 100) / 100
        )
      }

      if (facture_price_drivers >= 0) {
        setBenefit_drivers(
          Math.round((facture_price_drivers - TotalDrivers) * 100) / 100
        )
      }

      if (facture_price_guides >= 0) {
        setBenefit_guides(
          Math.round((facture_price_guides - TotalGuides) * 100) / 100
        )
      }

      if (facture_price_services >= 0) {
        setBenefit_services(
          Math.round((facture_price_services - TotalServices) * 100) / 100
        )
      }

      setFacture_P_HT(
        parseFloat(facture_price_restauration || 0) + 
        parseFloat(facture_price_drivers || 0) + 
        parseFloat(facture_price_guides || 0) +
        parseFloat(facture_price_services || 0)
      )

      // calcul all event benefit
      setBenefit_total(

        (facture_price_restauration >= 0  ? 
          Math.round((facture_price_restauration - TP_Event) * 100) / 100 : 0) + 

        (facture_price_drivers >= 0  ? 
          Math.round((facture_price_drivers - TotalDrivers) * 100) / 100 : 0) + 

        (facture_price_guides >= 0  ? 
          Math.round((facture_price_guides - TotalGuides) * 100) / 100 : 0) + 

        (facture_price_services >= 0  ? 
          Math.round((facture_price_services - TotalServices) * 100) / 100 : 0) +

        Total_Extras
      )

      // call function for calcul total price...
      if (Drivers.length > 0 || Guides.length > 0 || services.length > 0) {
        calculDriversAndGuidesAndServicesPrice()
      }

      // calcul net price and Tva price and total price
      setNetPrice(parseFloat(TP_Event) + parseFloat(TotalDrivers) + parseFloat(TotalGuides) + parseFloat(TotalServices) )
      setTVAPrice((parseFloat(TP_Event) + parseFloat(TotalDrivers) + parseFloat(TotalGuides) + parseFloat(TotalServices)) * (10/100))
      setTotalPrice(parseFloat(NetPrice) + parseFloat(TVAPrice))

    }, [
        ServicesVis, DriversVis, GuidesVis, ExtrasVis, RestaurationVis,
        TotalDrivers, TotalGuides, TotalServices, TP_Event, Total_Extras,
        NetPrice, TVAPrice, Labor, Purchasing, Repas, Num_Pers, 
        Drivers, Guides, services, 
        facture_price_restauration, facture_price_drivers, facture_price_guides, facture_price_services
    ])

      useEffect(()=>{

        if (!RestaurationVis) {
          
          setFacture_P_HT( pre => pre - parseFloat(facture_price_restauration || 0))
          
          setNetPrice(pre => pre - parseFloat(TP_Event))
          setTVAPrice(pre => pre - parseFloat(TP_Event) * 10/100)
          setTotalPrice(NetPrice + TVAPrice)
          
          setBenefit_total( pre => 
            pre -
            (facture_price_restauration >= 0  ? 
              Math.round((facture_price_restauration - TP_Event) * 100) / 100 : 0) 
          )

        }

        if (!ServicesVis) {

          setFacture_P_HT( pre => pre - parseFloat(facture_price_services || 0))
          
          setNetPrice(pre => pre - parseFloat(TotalServices))
          setTVAPrice(pre => pre - parseFloat(TotalServices) * 10/100)
          setTotalPrice(NetPrice + TVAPrice)

          setBenefit_total( pre => 
            pre -
            (facture_price_services >= 0  ? 
              Math.round((facture_price_services - TotalServices) * 100) / 100 : 0) 
          )

        }

        if (!DriversVis) {

          setFacture_P_HT( pre => pre - parseFloat(facture_price_drivers || 0))
          
          setNetPrice(pre => pre - parseFloat(TotalDrivers))
          setTVAPrice(pre => pre - parseFloat(TotalDrivers) * 10/100)
          setTotalPrice(NetPrice + TVAPrice)

          setBenefit_total( pre => 
            pre -
            (facture_price_drivers >= 0  ? 
              Math.round((facture_price_drivers - TotalDrivers) * 100) / 100 : 0) 
          )

        }

        if (!GuidesVis) {

          setNetPrice(pre => pre - parseFloat(TotalGuides))
          setTVAPrice(pre => pre - parseFloat(TotalGuides) * 10/100)
          setTotalPrice(NetPrice + TVAPrice)
          
          setFacture_P_HT( pre => pre - parseFloat(facture_price_guides || 0))

          setBenefit_total( pre => 
            pre -
            (facture_price_guides >= 0  ? 
              Math.round((facture_price_guides - TotalGuides) * 100) / 100 : 0) 
          )

        }

        if (!ExtrasVis) {

          setBenefit_total(pre => pre - Total_Extras)

        }

      }, [RestaurationVis, NetPrice, Facture_P_HT, ServicesVis, DriversVis, GuidesVis, ExtrasVis])

    // validate info of services
    const validation_Info = () => {
      
      let error = false
      let DriversArray = Drivers;
      let GuidesArray = Guides;
      let ServiceArray = services;
      let ExtrasArray = Extras;

      if (DriversVis) {
        
        DriversArray = Drivers.map((item) => {
          
          let ArrayErr = []

          if (item.name === '') {

            error = true
            ArrayErr.push(`Nom de Cheffeur ${item.id} est obligatoire`)

          }
          
          if(item.phone == ''){
            
            error = true
            ArrayErr.push(`Telephone de Cheffeur ${item.id} est obligatoire`)

          } 
          
          if(ArrayErr.length > 0){
            
            return {
              ...item,
              err : ArrayErr
            }

          }
            return {
              ...item,
              err : ''
            }



        })

      }

      if(GuidesVis){

        GuidesArray = Guides.map((item) => {
        
        let ArrayErr = []
        
        if (item.name == '') {

          error = true

          ArrayErr.push(`Nom de Guide ${item.id} est obligatoire`)

        }
        
        if (item.type == '') {

          error = true
          ArrayErr.push(`Type de Guide ${item.id} est obligatoire`)

        } 

        if (item.phone == '') {

          error = true
          ArrayErr.push(`Telephone de Guide ${item.id} est obligatoire`)

        } 

        if (ArrayErr.length > 0) {
          return {
            ...item,
            err : ArrayErr
          }
        }
          return {
            ...item,
            err : ''
          }
        

      })

      }

      if (ServicesVis) {
        
        ServiceArray = services.map(item => {

          let ArrayErr = [];
  
          if (item.service == '') {
            
            error = true
            ArrayErr.push(`Le service ${item.id} est obligatoire`)
  
          }
  
          if (item.price_per_pers == 0) {
            
            error = true
            ArrayErr.push(`Le montant dépensé de service ${item.id} est obligatoire`)
  
          }
  
          if (
            item.is_price_per_pers && item?.num_pers == 0
          ) {
            
            error = true
            ArrayErr.push(`Le nombre de personnes est obligatoire`)
  
          }
  
          if(ArrayErr.length > 0){
            
            return {
              ...item,
              err : ArrayErr
            }
  
          }
            return {
              ...item,
              err : ''
            }
  
  
        })

      }
      
      if (ExtrasVis) {
        
        ExtrasArray = Extras.map(item => {

          let ArrayErr = [];

          if (item.name != '' && item.price == 0) {
            
            error = true
            ArrayErr.push(`Le prix de extra ${item.id} est obligatoire`)

          }

          if (item.name == '' && item.price > 0) {
            
            error = true
            ArrayErr.push(`Le extra ${item.id} est obligatoire`)

          }

          if(ArrayErr.length > 0){
            
            return {
              ...item,
              err : ArrayErr
            }

          }
            return {
              ...item,
              err : ''
            }


        })

      }

      
      setDrivers(DriversArray)
      setGuides(GuidesArray)
      setServices(ServiceArray)
      setExtras(ExtrasArray)

      return error
    }
    
    const createEvent = async(e) => {
      setInProgress(true)

      e.preventDefault()
      let error = validation_Info();

      if (!error) {

        toast.loading('Le traitement est en cours...')

        try{

          const res = await Axios.post('/reservations', {
            Ref: Ref,
            real_date: Real_D,
            modify_date: Modify_D,
            cancellation_date: Cancel_D,
            Persone_Number: Num_Pers,
            vegitarian: Num_Pers_Vegitarian,

            drivers :  DriversVis ? Drivers.filter(item => item.name != '' && item.phone != '') : [],
            guides :  GuidesVis ? Guides.filter(item => item.name != '' && item.phone != '' && item.type != '') : [],
            services :  ServicesVis ? services.filter(item => item.service != '' && item.origin_price > 0) : [],
            extras :  ExtrasVis ? Extras.filter(item => item.name != '' && item.price > 0) : [],

            activite : activite,
            labor : RestaurationVis ? Labor : 0,
            repas: RestaurationVis ? Repas : 0,
            purchasing: RestaurationVis ? Purchasing : 0,
            
            facture : {
              drivers : DriversVis ? Math.round(facture_price_drivers * 100) / 100 : 0,
              guides : GuidesVis ? Math.round(facture_price_guides * 100) / 100 : 0,
              services : ServicesVis ? Math.round(facture_price_services * 100) / 100 : 0,
              restauration : RestaurationVis ? Math.round(facture_price_restauration * 100) / 100 : 0,
            }

          })

          if (res.status == 200) {

            toast.dismiss()
            toast.success('activité créée avec succés')

            setSearchQuery(Ref)
            setEnd_date("")
            setStart_date("")
            setcurrentPage(1)
            setSearchInfo(pre => {
              return {
                ...pre,
                query : Ref
              }
            })
            setInSearch(true)
            setReload(true)

            closeModal(false)

          }

        }catch(rej){
          
          if (rej.response.status == 422) {

            toast.dismiss()
            toast.error('Informations non complétées')
            const messages = rej.response.data;

            setErrRef(messages.Ref || '')
            setErrReal_D(messages.real_date || '')
            setErrModify_D(messages.modify_date || '')
            setErrCancel_D(messages.cancellation_date || '')
            setErrNum_Pers(messages.Persone_Number || '')
            setErrNum_Pers_Vegitarian(messages.vegitarian || '')
            setErractivite(messages.activite || '')
            setErrRepas(messages.repas || '')
            setErrPurchasing(messages.purchasing || '')

          }else{
            
            toast.dismiss()
            toast.error('Parfois mal, veuillez réessayer')
          }

        }

      }else{
        toast.error('Informations non complétées')
      }
      setInProgress(false)
    }

    const updateevenement = async(e, id) => {
      setInProgress(true)
      e.preventDefault()
      let error = validation_Info();

      if (!error) {

        try{
          toast.loading('Le traitement est en cours...')
          const res = await Axios.post('/update-reservation/' + id, {
            _method : 'PUT',
            Ref: Ref,
            real_date: Real_D,
            modify_date: Modify_D,
            cancellation_date: Cancel_D,
            Persone_Number: Num_Pers,
            vegitarian: Num_Pers_Vegitarian,

            drivers : Drivers.filter(item => DriversVis && item.name != '' && item.phone != '' && item.price != 0),
            guides : Guides.filter(item => GuidesVis && item.name != '' && item.phone != '' && item.type != ''),
            services : services.filter(item => ServicesVis && item.service != '' && item.origin_price > 0),
            extras : Extras.filter(item => ExtrasVis && item.name != '' && item.price > 0),

            activite : activite,
            labor : RestaurationVis ? Labor : 0,
            repas: RestaurationVis ? Repas : 0,
            purchasing: RestaurationVis ? Purchasing : 0,
            
            facture : {
              drivers : DriversVis ? Math.round(facture_price_drivers * 100) / 100 : 0,
              guides : GuidesVis ? Math.round(facture_price_guides * 100) / 100 : 0,
              services : ServicesVis ? Math.round(facture_price_services * 100) / 100 : 0,
              restauration : RestaurationVis ? Math.round(facture_price_restauration * 100) / 100 : 0,
            }

          })

          if (res.status == 200) {

            const newArray = Evenements.map((item) => {
              
              if (item.id == id) {
                
                return res.data.data

              }

              return item

            })
            
            setEvenements(newArray)

            toast.dismiss()
            toast.success('activité mise à jour avec succés')
            closeModal(false)

          }

        }catch(rej){
          
          if (rej.response.status == 422) {
            
            toast.dismiss()
            toast.error('Informations non complétées')
            const messages = rej.response.data;

            setErrRef(messages.Ref || '')
            setErrReal_D(messages.real_date || '')
            setErrModify_D(messages.modify_date || '')
            setErrCancel_D(messages.cancellation_date || '')
            setErrNum_Pers(messages.Persone_Number || '')
            setErrNum_Pers_Vegitarian(messages.vegitarian || '')
            setErractivite(messages.activite || '')
            setErrRepas(messages.repas || '')
            setErrPurchasing(messages.purchasing || '')

          }else{
            
            toast.dismiss()
            toast.error('Parfois mal, veuillez réessayer')
          }

        }

      }else{
        toast.error('Informations non complétées')
      }
      setInProgress(false)
    }

    const GetDriver = async (e, id) => {
      
      try {
        const res = await Axios.get("/driver/get-driver/" + e.target.value);

        if (res.status == 200 && res.data != '') {

          const updatedArray = Drivers.map((item) => {
            
            if (item.id == id) {
              return {
                ...item,
                phone: res?.data?.phone,
                name: res?.data?.name,
                err:[]
              };
            }

            return item;

          });

          setDrivers(updatedArray);

        }
      } catch (error) {
        
        if (error.response.status == 422) {
          
          const updatedArray = Drivers.map((item) => {
            if (item.id == id) {
              return {
                ...item,
                err : error.response.data.phone
              };
            }
            return item;
          });

          setDrivers(updatedArray);

        }

      }

    };

    const GetGuide = async (e, id) => {
      try {
        const res = await Axios.get("/guide/get-guide/" + e.target.value);
  
        if (res.status == 200 && res.data != '') {
          
          const updatedArray = Guides.map((item) => {
            if (item.id == id) {
              return {
                ...item,
                phone: res?.data?.phone,
                name: res?.data?.name,
                type: res?.data?.type,
                err : []
              };
            }
            return item;
          });
  
          setGuides(updatedArray);

        }
      } catch (error) {
        
        if (error.response.status == 422) {
          
          const updatedArray = Guides.map((item) => {
            if (item.id == id) {
              
              return {
                ...item,
                err : error.response.data.phone
              };

            }
            return item;
          });
  
          setGuides(updatedArray);

        }
        
      }
    };

    const hundelChangeNumPers = (e) => {

      e.preventDefault()

      setNum_Pers( pre => {

        setServices(preArray => {
          
          setFacture_price_services(0)

          return preArray.map(item => {

            if (item.num_pers == pre) {
              
              const facture_price = item?.is_price_per_pers ?
              item?.facture_price_per_pers *  parseInt(e.target.value) || 0
              :
              item?.facture_price;
              
              const origin_price = item?.is_price_per_pers ? item?.price_per_pers * parseInt(e.target.value || 0) : item?.price_per_pers;
              
              setFacture_price_services(pre => pre + facture_price)

              return {
                ...item,
                origin_price : origin_price,
                num_pers : parseInt(e.target.value) || 0,
                facture_price : facture_price,
                benefit : facture_price - origin_price
              }

            }

            setFacture_price_services(pre => pre + item?.facture_price)

            return item

          })

        })

        return parseInt(e.target.value) || 0
      })

    }
    
  return (
    <div className="fixed top-0 h-screen z-50 right-0 w-full flex justify-center items-center">
      <div className="fixed top-0 right-0 z-30 w-full h-screen bg-slate-500 opacity-60" />

      <div className="bg-white w-[98%] sm:w-[90%] md:w-[85%] lg:w-[70%] z-50 rounded-lg">

        <div className="flex items-center justify-between p-3">
          <h1 className="text-[28px] font-bold">{header}</h1>
          <button onClick={() => closeModal(false)}><IoMdCloseCircleOutline fontSize={25}/></button>
        </div>

        <hr className="bevenement-gray-600" />

        <div className="flex flex-col gap-3 p-2 sm:p-3">

          <div className="p-2 rounded-lg">
            
            <form action="" className="relative h-[83vh] flex flex-col gap-5 hide-scrollbar overflow-y-scroll">

              <div className='flex flex-col gap-6 border border-gray-500 rounded-lg pt-2 pb-3 px-2'>
                <h2 className='font-bold text-[20px] text-primary_text'>Informations sur l'activité :</h2>
                
                <div className='flex flex-col gap-6'>

                  <div className="flex flex-col">
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <label className=" w-1/4 font-semibold">Ref</label>
                        <input
                          type="text"
                          disabled={action === 'show'}
                          value={Ref || ''}
                          onChange={(e) => setRef(e.target.value)}
                          className={` ${ErrRef ? 'border-red-500' : 'border-gray-400'} border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                        />
                    </div>
                    { ErrRef && <p className="text-red-500 font-semibold ml-[25%] px-4 py-1">{ErrRef}</p>}
                  </div>

                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-5'>

                    <div className="flex flex-col w-full sm:w-[50%]">
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <label className=" w-2/4 font-semibold">D.Real</label>
                          <input
                          type="date"
                          disabled={action === 'show'}
                          value={Real_D || ''}
                          onChange={(e) => setReal_D(e.target.value)}
                          className={` ${ErrReal_D ? 'border-red-500' : 'border-gray-400'} border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                          />
                      </div>
                      { ErrReal_D && <p className="text-red-500 font-semibold py-1">{ErrReal_D}</p>}
                    </div>

                    <div className="flex flex-col w-full sm:w-[50%]">
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <label className=" w-2/4 font-semibold">Date modifiée</label>
                          <input
                          type="date"
                          disabled={action === 'show'}
                          value={Modify_D || ''}
                          onChange={(e) => setModify_D(e.target.value)}
                          className={` ${ErrModify_D ? 'border-red-500' : 'border-gray-400'} border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                          />
                      </div>
                      { ErrModify_D && <p className="text-red-500 font-semibold py-1">{ErrModify_D}</p>}
                    </div>

                  </div>

                  <div className="flex flex-col">
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <label className=" w-1/4 font-semibold">D.annulation</label>
                          <input
                          type="date"
                          disabled={action === 'show'}
                          value={Cancel_D || ''}
                          onChange={(e) => setCancel_D(e.target.value)}
                          className={` ${ErrCancel_D ? 'border-red-500' : 'border-gray-400'} border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                          />
                      </div>
                      { ErrCancel_D && <p className="text-red-500 font-semibold ml-[25%] px-4 py-1">{ErrCancel_D}</p>}
                  </div>

                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-5'>

                    <div className="flex flex-col w-full sm:w-[50%]">
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <label className="w-2/4 font-semibold">Nombre Persone</label>
                          <input
                          type="text"
                          min={0}
                          disabled={action === 'show'}
                          value={Num_Pers || 0}
                          onChange={(e) => hundelChangeNumPers(e)}
                          className={` ${ErrNum_Pers ? 'border-red-500' : 'border-gray-400'} border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                          />
                      </div>
                      { ErrNum_Pers && <p className="text-red-500 font-semibold py-1">{ErrNum_Pers}</p>}
                    </div>

                    <div className="flex flex-col w-full sm:w-[50%]">
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <label className="w-2/4 font-semibold">P.Vegitarian</label>
                          <input
                          type="text"
                          min={0}
                          disabled={action === 'show'}
                          value={Num_Pers_Vegitarian || 0}
                          onChange={(e) => setNum_Pers_Vegitarian(parseInt(e.target.value || 0))}
                          className={` ${ErrNum_Pers_Vegitarian ? 'border-red-500' : 'border-gray-400'} border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                          />
                      </div>
                      { ErrNum_Pers_Vegitarian && <p className="text-red-500 font-semibold py-1">{ErrNum_Pers_Vegitarian}</p>}
                    </div>

                  </div>

                  <div className="flex gap-3 items-center">
                      <label className=" w-1/4 font-semibold">activité</label>
                      <div className='w-3/4'>
                        <input disabled={action === 'show'} value={activite} onChange={(e) => setactivite(e.target.value)} 
                            className={`${ Erractivite ? 'border-red-500' : 'border-gray-400'} border w-full  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}/>
                        {Erractivite && <p className="text-red-500 font-semibold py-1">{Erractivite}</p>}

                      </div>
                  </div>

                  <div className='flex justify-around items-center gap-3 flex-wrap'>

                    <div className='flex items-center gap-3'>
                      <input disabled={action == 'show'} id='Restauration' checked={RestaurationVis} onChange={() => setRestaurationVis(!RestaurationVis)} type='checkbox' />
                      <label htmlFor='Restauration' className='font-semibold'>Restauration</label>
                    </div>  

                    <div className='flex items-center gap-3'>
                      <input disabled={action == 'show'} id='drivers' checked={DriversVis} onChange={() => setDriversVis(!DriversVis)} type='checkbox' />
                      <label htmlFor='drivers' className='font-semibold'>Chauffeurs</label>
                    </div>

                    <div className='flex items-center gap-3'>
                      <input disabled={action == 'show'} id='guides' checked={GuidesVis} onChange={() => setGuidesVis(!GuidesVis)} type='checkbox' />
                      <label htmlFor='guides' className='font-semibold'>Guides</label>
                    </div>

                    <div className='flex items-center gap-3'>
                      <input disabled={action == 'show'} id='services' checked={ServicesVis} onChange={() => setServicesVis(!ServicesVis)} type='checkbox' />
                      <label htmlFor='services' className='font-semibold'>Autre Services</label>
                    </div>

                    <div className='flex items-center gap-3'>
                      <input disabled={action == 'show'} id='Extras' checked={ExtrasVis} onChange={() => setExtrasVis(!ExtrasVis)} type='checkbox' />
                      <label htmlFor='Extras' className='font-semibold'>Les Extra</label>
                    </div>

                  </div>

                </div>

              </div>

              {
                RestaurationVis && 
                <Restauration
                  action={action}
                  Labor={Labor}
                  setLabor={setLabor}
                  Repas={Repas}
                  setRepas={setRepas}
                  ErrRepas={ErrRepas}
                  Purchasing={Purchasing}
                  setPurchasing={setPurchasing}
                  ErrPurchasing={ErrPurchasing}
                  TP_Event={TP_Event}
                  setTP_Event={setTP_Event}
                  Benefit_restauration={Benefit_restauration}
                  Facture_price_restauration={facture_price_restauration}
                  setFacture_price_restauration={setFacture_price_restauration}
                />
              }

              {
                DriversVis && 
                <DriversCom 
                    Drivers={Drivers}
                    setDrivers={setDrivers}
                    removeDriversAndGuidesAndServices={removeDriversAndGuidesAndServices}
                    AddGuideAndDriverAndService={AddGuideAndDriverAndService}
                    TotalDrivers={TotalDrivers}
                    Facture_price_drivers={facture_price_drivers}
                    Benefit_drivers={Benefit_drivers}
                    setFacture_price_drivers={setFacture_price_drivers}
                    action={action}
                    GetDriver={GetDriver}
                />
              }

              {
                GuidesVis && 
                <GuidesCom 
                  Guides={Guides}
                  setGuides={setGuides}
                  removeDriversAndGuidesAndServices={removeDriversAndGuidesAndServices}
                  AddGuideAndDriverAndService={AddGuideAndDriverAndService}
                  TotalGuides={TotalGuides}
                  Facture_price_guides={facture_price_guides}
                  Benefit_guides={Benefit_guides}
                  setFacture_price_guides={setFacture_price_guides}
                  action={action}
                  GetGuide={GetGuide}
                />
              }

              {
                ServicesVis && 
                <Services 
                  setServices={setServices}
                  action={action}
                  services={services}
                  TotalServices={TotalServices}
                  Benefit_services={Benefit_services}
                  Facture_price_services={facture_price_services}
                  setFacture_price_services={setFacture_price_services}
                  AddGuideAndDriverAndService={AddGuideAndDriverAndService}
                  removeDriversAndGuidesAndServices={removeDriversAndGuidesAndServices}
                />
              }

              {
                ExtrasVis && 
                <ExtrasCom
                  action={action}
                  Total_Extras={Total_Extras}
                  setTotal_Extras={setTotal_Extras}
                  Extras={Extras}
                  setExtras={setExtras}
                  AddGuideAndDriverAndService={AddGuideAndDriverAndService}
                  removeDriversAndGuidesAndServices={removeDriversAndGuidesAndServices}
                />
              }


              <div className='flex flex-col gap-6 border border-gray-500 rounded-lg pt-2 pb-3 px-2'>
                <h2 className='font-bold text-[20px] text-primary_text'>Resultats Financiers :</h2>
                
                <div className='flex flex-col gap-6'>

                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-5'>

                    <div className="flex flex-col w-full sm:w-[50%]">
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <label className="w-full sm:w-2/4 font-semibold">M.D Net</label>
                          <input
                          type="text"
                          min={0}
                          disabled={true}
                          value={Math.round(NetPrice * 100) / 100}
                          onChange={(e) => setNetPrice(e.target.value)}
                          className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                          />
                      </div>
                    </div>

                    <div className="flex flex-col w-full sm:w-[50%]">
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <label className="w-full sm:w-2/4 font-semibold">TVA</label>
                          <input
                          type="text"
                          min={0}
                          disabled={true}
                          value={Math.round(TVAPrice * 100) / 100}
                          onChange={(e) => setTVAPrice(e.target.value)}
                          className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                          />
                      </div>
                    </div>

                  </div>

                  <div className="flex flex-col gap-5">
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <label className="w-full sm:w-1/4 font-semibold">Montant Dépensé Prix</label>
                          <input
                          type="text"
                          disabled={true}
                          value={Math.round(TotalPrice * 100) / 100}
                          className={`border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                          />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <label className="w-full sm:w-1/4 font-semibold">P.T.H.T de facture</label>
                          <input
                          type="text"
                          disabled={true}
                          value={Math.round(Facture_P_HT * 100) / 100}
                          className={`border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                          />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <label className="w-full sm:w-1/4 font-semibold">Bénefices</label>
                          <input
                          type="text"
                          disabled={true}
                          value={Math.round(Benefit_total * 100) / 100}
                          className={`border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                          />
                      </div>
                  </div>

                </div>
              </div>
              
              {
                action === 'create' && <button disabled={InProgress} onClick={(e) => createEvent(e)} className="p-2 mx-auto w-full sm:w-fit font-semibold bg-second text-white rounded-md">Créer</button>

              }

              {
                action === 'update' && <button disabled={InProgress} onClick={(e) => updateevenement(e, Evenement.id)} className="p-2 mx-auto w-full sm:w-fit font-semibold bg-second text-white rounded-md">Enregistrer</button>
              }
              {
                action === 'show' && 
                <button onClick={(e) => closeModal(false)} className="p-2 mx-auto w-full sm:w-fit font-semibold bg-gray-500 text-white rounded-md">Fermer</button>
              }

            </form>

          </div>

        </div>

      </div>
    </div>
  )
}

export default EvenementM