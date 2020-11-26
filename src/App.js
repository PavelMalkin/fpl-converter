import React, {useState, useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import {Fir} from "./FIR";
import {withMobileDialog} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    icon: {}
}));

function App() {
    const [fpl, setFPL] = useState('(FPL-ERF9502-IN\n' +
        '-B752/M-SDFHIRWXY/S\n' +
        '-GABS0400\n' +
        '-N0469F350 ONTOL UM108 USRUT UM735 TIO UG26 BAY UM986 TRB UG26\n' +
        'CHE/N0459F360 UA29 SADAF/N0460F350 UN861 ASMOT UN851 PTC UZ238 CHELY\n' +
        'UN853 LUMAS/N0459F360 UZ191 NEVIX UZ192 ROTIS UN870 MAXIR UN853\n' +
        'VANAS\n' +
        'DCT ESOKO DCT GODRA/N0462F350 DCT INTEG DCT MADEB N871 BEPAS T709\n' +
        'BAVOK DCT BIGLU L999 MNS T52 MOSON A104 FK DCT UMBEG UMBEG1R\n' +
        '-UUWW0808 UUDD UWGG\n' +
        '-PBN/A1B3B4B5C4D4 DOF/201102 REG/VPBHM EET/DRRR0125 DAAA0139\n' +
        'LECB0330 LFMM0407 LIMM0438 LFMM0440 LIMM0445 LSAS0447 LOVV0505\n' +
        'EDMM0509 LOVV0510 EDMM0513 LKAA0533 EPWW0559 UMMV0631 UUWV0719\n' +
        'OPR/EROFEY RALT/GABS GAGO DAUA DAAG LIRF EPWA UUWW TALT/GFLL RMK/ERF\n' +
        'OPS 0079261091843 PERM MALI N3911/ANAC/DG MAURITANIA SUR-1721/A-20\n' +
        'ALGERIA 5409/DACM/SDTA/BS/2020 BELARUS SAC399/301020\n' +
        'RUSSIAN FEDERATION 377/3010-20 TCAS II VER 7 1)')
    const [jpsRoute, setJpsRoute] = useState('')
    const [svRoute, setSVRoute] = useState('')
    const [listOfCountry, setlistOfCountry] = useState('')
    const [ecErr, setEcErr] = useState('PROF204: RS: TRAFFIC VIA ESOKO GODRA:F355..F365 IS ON FORBIDDEN ROUTE REF:[LS5063A] APP4 ESOKO DCT GODRA\n' +
        'PROF204: RS: TRAFFIC VIA LST201:F300..F660 [202011101230..202011101600] IS ON FORBIDDEN ROUTE REF:[LST201R] RAD APPENDIX 7 / AREA ACTIVE BY AUP/UUP\t\n' +
        'PROF204: RS: TRAFFIC VIA LST201Z:F285..F660 [202011101230..202011101600] IS ON FORBIDDEN ROUTE REF:[LST201ZR] RAD APPENDIX 7 / AREA ACTIVE BY AUP/UUP\t\n' +
        'PROF204: RS: TRAFFIC VIA LST202:F300..F660 [202011101230..202011101600] IS ON FORBIDDEN ROUTE REF:[LST202R] RAD APPENDIX 7 / AREA ACTIVE BY AUP/UUP\t\n' +
        'PROF204: RS: TRAFFIC VIA LST202Z:F285..F660 [202011101230..202011101600] IS ON FORBIDDEN ROUTE REF:[LST202ZR] RAD APPENDIX 7 / AREA ACTIVE BY AUP/UUP\t\n' +
        'PROF204: RS: TRAFFIC VIA LST203:F300..F660 [202011101230..202011101600] IS ON FORBIDDEN ROUTE REF:[LST203R] RAD APPENDIX 7 / AREA ACTIVE BY AUP/UUP\t\n' +
        'PROF204: RS: TRAFFIC VIA LST203Z:F285..F660 [202011101230..202011101600] IS ON FORBIDDEN ROUTE REF:[LST203ZR] RAD APPENDIX 7 / AREA ACTIVE BY AUP/UUP\t\n' +
        'PROF204: RS: TRAFFIC VIA LST204Z:F285..F660 [202011101230..202011101600] IS ON FORBIDDEN ROUTE REF:[LST204ZR] RAD APPENDIX 7 / AREA ACTIVE BY AUP/UUP\t\n' +
        'PROF204: RS: TRAFFIC VIA LST301:F300..F660 [202011101230..202011101600] IS ON FORBIDDEN ROUTE REF:[LST301R] RAD APPENDIX 7 / AREA ACTIVE BY AUP/UUP\t\n' +
        'PROF204: RS: TRAFFIC VIA LST301Z:F285..F660 [202011101230..202011101600] IS ON FORBIDDEN ROUTE REF:[LST301ZR] RAD APPENDIX 7 / AREA ACTIVE BY AUP/UUP\t\n' +
        'PROF204: RS: TRAFFIC VIA LST302Z:F285..F660 [202011101230..202011101600] IS ON FORBIDDEN ROUTE REF:[LST302ZR] RAD APPENDIX 7 / AREA ACTIVE BY AUP/UUP\t\n' +
        'PROF204: RS: TRAFFIC VIA LST501Z:F285..F660 [202011101300..202011101440] IS ON FORBIDDEN ROUTE REF:[LST501ZR] RAD APPENDIX 7 / AREA ACTIVE BY AUP/UUP\t\n' +
        'ROUTE165: THE DCT SEGMENT INTEG..MADEB (18 NM) IS TOO LONG FOR EDUUFRAS. MAXIMUM IS 0 NM [EDUU2B]\t\n' +
        'ROUTE165: THE DCT SEGMENT INTEG..MADEB (18 NM) IS TOO LONG FOR LSDCT. MAXIMUM IS 0 NM [LS1A]')

    const classes = useStyles()

    const updateRoutesFromFPL = () => {
        let jps = '';
        if (fpl.split('').some(e => e === '-')) {
            let route = fpl.split('-')[6].split(/\sDCT\s|[\s]/)
            route.shift()
            route.pop()
            route = route.join(' ')

            route.split('/').join(' ').split(' ').forEach(res => {
                if (res.length < 6) jps += res + ' '
            })
            if (jps !== jpsRoute) {
                setJpsRoute(jps)
            }
            if (route !== svRoute) {
                setSVRoute(route)
            }
        }
    }

    const updateRouteFromSV = () => {
        let FPLRoute = fpl.split('-')[6].split(' ')[0] ///adding first speed and altitude
        svRoute.split(' ').forEach((elem, index) => {
            if (isPoint(elem) && isPoint(FPLRoute.split(' ').reverse()[0]) && elem && index > 1) {
                FPLRoute += ' DCT ' + elem ///adding DCT between points
            } else {
                FPLRoute += ' ' + elem
            }
        })
        let tempFpl = fpl.split('-')
        tempFpl[6] = FPLRoute + '\n';
        if (tempFpl.join('-') !== fpl) {
            setFPL(tempFpl.join('-'))
        }
    }

    const findFIRsInFPL = (fpl) => {
        let fieldEighteen = fpl.split('-')[8].split(/[\s]/)
        let startIndex = fieldEighteen.findIndex(res => res.split('/')[0] === 'EET')
        let endIndex = fieldEighteen.findIndex((res, index) => (index > startIndex && res.includes('/')))
        let FIRs = fieldEighteen.slice(startIndex, endIndex);
        FIRs[0] = FIRs[0].split('/')[1]
        return FIRs
    }

    const countryListByFirs = (FIRsFromFPL) => {
        let countryList = [];
        FIRsFromFPL.map(fir => {
            Object.keys(Fir).map(country => {
                if (country === fir.split('').splice(0, 4).join('')) {
                    countryList.push(Fir[country])
                }
            })
        })
        return countryList
    }

    useEffect(() => {
        if (fpl.length && fpl.split('').some(e => e === '-')) {
            updateRoutesFromFPL()
            setlistOfCountry(countryListByFirs(findFIRsInFPL(fpl)).join('\n'))
        }
    }, [fpl])

    useEffect(() => {
        if (svRoute.length && fpl.split('').some(e => e === '-')) {
            updateRouteFromSV()
        }
    }, [svRoute])

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'FPL':
                setFPL(event.target.value);
                break;
            case 'JPS' :
                setJpsRoute(event.target.value);
                break;
            case 'SV':
                setSVRoute(event.target.value);
                break;
            case 'ECErr':
                setEcErr(event.target.value);
                break;
        }
    };

    const isPoint = (string) => {
        return (!string.match(/[0-9]/) || string.length > 10)
    }


    // const handleSubmit = (e) => {
    //     if (fpl.split('').some(e => e === '-') ) {
    //         let FPLRoute = fpl.split('-')[6].split(' ')[0] ///adding first speed and altitude
    //         e.target.value.split(' ').forEach((elem, index) => {
    //             if (isPoint(elem) && isPoint(FPLRoute.split(' ').reverse()[0]) && elem && index > 1) {
    //                 FPLRoute += ' DCT ' + elem ///adding DCT between points
    //             } else {
    //                 FPLRoute += ' ' + elem
    //             }
    //         })
    //         let tempFpl = fpl.split('-')
    //         tempFpl[6] = FPLRoute + '\n';
    //         setFPL(tempFpl.join('-'))
    //     }
    // }

    const handleButtonsClick = (id) => {
        document.getElementById(id).select();
        document.execCommand('copy')
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <div id='FPL-wrapper'>
                        <TextField
                            id="FPL"
                            label="FPL"
                            multiline
                            rows={15}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={updateRoutesFromFPL}
                            value={fpl}
                        />
                        <IconButton aria-label="copy" onClick={() => handleButtonsClick('FPL')}>
                            <FileCopyIcon color='primary'/>
                        </IconButton>
                        <IconButton aria-label="paste" onClick={() => navigator.clipboard.readText().then(clipText =>
                            setFPL(clipText))}>
                            <PostAddIcon color='primary'/>
                        </IconButton>
                    </div>

                    <div id='SkyVector-wrapper'>
                        <TextField
                            id="SV"
                            label="SV Route"
                            multiline
                            // rows={3}
                            variant="outlined"
                            onChange={handleChange}
                            value={svRoute}
                        />
                        <IconButton aria-label="copy" onClick={() => navigator.clipboard.writeText(svRoute)}>
                            <FileCopyIcon color='primary'/>
                        </IconButton>
                        <IconButton aria-label="paste" onClick={() => navigator.clipboard.readText().then(clipText =>
                            setSVRoute(clipText))}>
                            <PostAddIcon color='primary'/>
                        </IconButton>
                    </div>
                    <TextField
                        id="JPS"
                        label="Jps Route"
                        multiline
                        // rows={3}
                        variant="outlined"
                        onChange={handleChange}
                        value={jpsRoute}
                    />

                    <TextField
                        id="ECErr"
                        label="Eurocontrol Errors"
                        multiline
                        // rows={3}
                        variant="outlined"
                        onChange={handleChange}
                        value={ecErr}
                    />

                </div>
            </form>

            <Tooltip title="Add" placement="top">
                <IconButton aria-label="copy" >
                    <FileCopyIcon color='primary'/>
                </IconButton>
            </Tooltip>

            <Paper elevation={3}>

                <p>{listOfCountry}</p>
            </Paper>

        </div>
    );
}

export default App;
