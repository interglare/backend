import * as React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    Font,
    StyleSheet,
} from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';
import { CreateBillDto } from 'src/bill/dto/create-bill.dto';
import { renderToStaticMarkup } from 'react-dom/server';
import { convert as numberToWordsRu } from 'number-to-words-ru';

interface MyDocumentProps {
    data: CreateBillDto
}

const MyDocument = ({data}:MyDocumentProps) => {

    const lowerize = (obj:CreateBillDto) =>
    Object.keys(obj).reduce((acc, k) => {
      acc[k.toLowerCase()] = obj[k];
      return acc;
    }, data);
    
    lowerize(data);
    
    Font.register({
        family: "Roboto",
        src:
            "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
    });
    const element = (
        <table style={{ border: '1px black solid', fontFamily: 'Roboto', fontSize: 8, marginTop: 10, }}>
            <thead>
                <tr>
                    <th style={{ paddingLeft: 4, maxWidth: 20 }}>№</th>
                    <th style={{ paddingLeft: 4, maxWidth: 70 }}>Код</th>
                    <th style={{ paddingLeft: 4, }}>Наименование</th>
                    <th style={{ paddingLeft: 4, maxWidth: 40 }}>Кол-во</th>
                    <th style={{ paddingLeft: 4, maxWidth: 40 }}>Ед.</th>
                    <th style={{ paddingLeft: 4, maxWidth: 70 }}>Цена</th>
                    <th style={{ paddingLeft: 4, maxWidth: 70 }}>Сумма</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.price.map((item, index) => (
                        <tr key={index}>
                            <td style={{ paddingLeft: 4, maxWidth: 20 }}>{index+1}</td>
                            <td style={{ paddingLeft: 4, maxWidth: 70 }}>ANG00003356</td>
                            <td style={{ paddingLeft: 4, }}>Комиссионный сбор за победу в тендере</td>
                            <td style={{ paddingLeft: 4, maxWidth: 40 }}>1</td>
                            <td style={{ paddingLeft: 4, maxWidth: 40 }}>Тенге</td>
                            <td style={{ paddingLeft: 4, maxWidth: 70 }}>{item}</td>
                            <td style={{ paddingLeft: 4, maxWidth: 70 }}>{item}</td>
        
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
    const html = renderToStaticMarkup(element)// 'ReactDOMServer.renderToStaticMarkup(element)';
    const initialValue = 0;
    const sumWithInitial = data.price.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
    );

    const getNumberWords = () => {
        return numberToWordsRu(sumWithInitial, {
            currency: {
                currencyNameCases: [
                    "тенге",
                    "тенге",
                    "тенге"
                ],
                currencyNameDeclensions: {
                    nominative: [
                        "тенге",
                        ""
                    ],
                    genitive: [
                        "тенге",
                        "тенге"
                    ],
                    dative: [
                        "тенге",
                        "тенге"
                    ],
                    accusative: [
                        "тенге",
                        ""
                    ],
                    instrumental: [
                        "тенге",
                        "тенге"
                    ],
                    prepositional: [
                        "тенге",
                        "тенге"
                    ]
                },
                fractionalPartNameCases: [
                    "тиын",
                    "тиын",
                    "тиын"
                ],
                fractionalPartNameDeclensions: {
                    nominative: [
                        "тиын",
                        ""
                    ],
                    genitive: [
                        "тиын",
                        "тиын"
                    ],
                    dative: [
                        "тиын",
                        "тиын"
                    ],
                    accusative: [
                        "тиын",
                        ""
                    ],
                    instrumental: [
                        "тиын",
                        "тиын"
                    ],
                    prepositional: [
                        "тиын",
                        "тиын"
                    ]
                },
                currencyNounGender: {
                    integer: 0,
                    fractionalPart: 0
                },
                fractionalPartMinLength: 2
            }
        })
    }

    return (
        <Document>
            <Page size={'A4'} style={styles.myText}>
                {/* <Html>{html}</Html> */}
                <View style={styles.attentionRow}>
                    <Text style={styles.attentionText}>Внимание! Оплата данного счета означает согласие с условиями поставки товара. Уведомление об оплате обязательно, в противном случае не гарантируется наличие товара на складе. Товар отпускается по факту прихода денег на р/с Поставщика, самовывозом, при наличии доверенности и документов удостоверяющих личность.</Text>
                </View>
                <View style={{ marginTop: 20, }}>
                    <Text style={styles.sampleText}>Образец платежного поручения</Text>
                    <View style={{ borderColor: '#000', borderWidth: 1, }}>
                        <View style={{ flexDirection: 'row', fontSize: 9 }}>
                            <View style={{ flexGrow: 1, padding: 4 }}>
                                <Text style={{}}>Бенефициар</Text>
                                <Text> TOO</Text>
                                <Text>БИН: </Text>
                            </View>
                            <View style={{ textAlign: 'center', padding: 4, borderLeft: 1, width: 150, }}>
                                <Text>ИИК</Text>
                                <Text style={{}}></Text>
                            </View>
                            <View style={{ borderLeft: 1, width: 100, padding: 4, textAlign: 'center' }}>
                                <Text>Кбе</Text>
                                <Text></Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', fontSize: 9, borderTop: 1 }}>
                            <View style={{ flexGrow: 1, padding: 4 }}>
                                <Text>Банк бенефициара:</Text>
                                <Text></Text>
                            </View>
                            <View style={{ textAlign: 'center', padding: 4, borderLeft: 1, width: 100, }}>
                                <Text>БИК</Text>
                                <Text style={{}}></Text>
                            </View>
                            <View style={{ borderLeft: 1, padding: 4, width: 150, textAlign: 'center' }}>
                                <Text>Код назначения платежа</Text>
                                <Text></Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Text style={{ fontSize: 14, marginTop: 20 }}>Счет на оплату № {data.number} от {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>

                <View style={{ marginTop: 10, borderBottom: 2, }}></View>

                <View style={{ fontSize: 9, marginTop: 10, }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text>Поставщик:</Text>
                        <Text style={{ width: 400, marginLeft: 10 }}></Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                        <Text>Покупатель:</Text>
                        <Text style={{ width: 400, marginLeft: 10 }}>{data.customer}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                        <Text>Договор:</Text>
                        <Text style={{ width: 400, marginLeft: 25 }}>Договор присоединения</Text>
                    </View>
                </View>
                <Html resetStyles>{html}</Html>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', fontSize: 9, marginTop: 5 }}>
                    <Text>Итого:</Text>
                    <Text style={{ width: 70, textAlign: 'right' }}>{sumWithInitial}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', fontSize: 9, marginTop: 5 }}>
                    <Text>В том числе НДС:</Text>
                    <Text style={{ width: 70, textAlign: 'right' }}>-</Text>
                </View>
                <View style={{ flexDirection: 'row', fontSize: 9, marginTop: 5 }}>
                    <Text>Всего наименований {data.price.length}, на сумму {sumWithInitial} KZT</Text>
                </View>
                <View style={{ flexDirection: 'row', fontSize: 9, marginTop: 5 }}>
                    <Text>Всего к оплате: {getNumberWords()}</Text>
                </View>

                <View style={{ marginTop: 10, borderBottom: 2, }}></View>

                <View style={{ flexDirection: 'row', fontSize: 9, marginTop: 10 }}>
                    <Text>Исполнитель</Text>
                    <View style={{ borderBottom: '1px solid black', width: 250, marginLeft: 20 }}></View>
                    <Text>//</Text>
                </View>
                <View style={{ flexDirection: 'row', fontSize: 9, marginTop: 10 }}>
                    <Text>Счёт действителен в течении 0 дней со дня выписки</Text>
                </View>

            </Page>
        </Document>
    )
};
const styles = StyleSheet.create({
    myText: {
        fontFamily: "Roboto",
        flexDirection: 'column',
        padding: 50,
    },
    attentionRow: {
        justifyContent: 'flex-end',
        flexDirection: 'row',

    },
    attentionText: {
        fontSize: 8,
        fontWeight: 'normal',
        width: 420,
        textAlign: 'center'
    },
    sampleText: {
        fontWeight: 'normal',
        fontSize: 10,
        // fontStyle: 'italic'
    },
})

export default MyDocument