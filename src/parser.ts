import {Pair, Section} from './store/slice';

export default function ParseText2Sections(text: string): Section[] {
    return text.split('\n\n')
        .map(section => section.split('\n'))
        .map<Section>(([title, ...pairs]) => ({
                title: title.substring(1, title.length - 1),
                pairs: pairs
                    .map(pair => pair.split(' = '))
                    .map<Pair>(pair => ({key: pair[0], value: pair[1] || 'null'}))
            })
        );
}