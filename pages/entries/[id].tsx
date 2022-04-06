import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material'
import React, { FC, useContext, useMemo, useState } from 'react'
import { Layout } from '../../components/layouts'
import { EntryStatus } from '../../interfaces'
import SaveOutlined from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { GetServerSideProps } from 'next'
import { isValidObjectId } from 'mongoose'
import { dbEntries } from '../../database'
import { Entry } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunctions } from '../../utils'

interface Props {
    entry: Entry
}

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

const EntryPage: FC<Props> = ({ entry }) => {
    console.log(entry)

    const {updateEntry} = useContext(EntriesContext)

    const [inputValue, setinputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputValue(event.target.value);
    }
    const onStatusChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        const status = event.target.value as EntryStatus;
        setStatus(status);
    }

    const onSave = () => {
        console.log('save clicked');
        console.log({ inputValue, status });
        if(inputValue.trim().length === 0){
            return;
        }
        const updatedEntry:Entry={
            ...entry,
            status,
            description:inputValue
        }
        updateEntry(updatedEntry,true)
    }

    return (
        <Layout title={`${inputValue.substring(0, 20) + '...'}`}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={`Creado hace ${dateFunctions.getFormatDistanceToNow(entry.createAt)}`}
                        >
                        </CardHeader>
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Nueva Entrada'
                                autoFocus
                                multiline
                                label="Nueva Entrada"
                                value={inputValue}
                                onBlur={() => setTouched(true)}
                                onChange={onInputValueChanged}
                                helperText={isNotValid ? 'Ingrese una entrada' : ''}
                                error={isNotValid}
                            />
                            {/* Radio */}
                            <FormControl>
                                <FormLabel>Estado</FormLabel>
                                <RadioGroup
                                    onChange={onStatusChanged}
                                    value={status}
                                    row
                                >
                                    {
                                        validStatus.map(status => (
                                            <FormControlLabel
                                                key={status}
                                                value={status}
                                                control={<Radio />}
                                                label={capitalize(status)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlined />}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark',
                }}
            >
                <DeleteOutlinedIcon />
            </IconButton>

        </Layout >
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string }

    const entry = await dbEntries.getEntryById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry,
        }
    }
}

export default EntryPage