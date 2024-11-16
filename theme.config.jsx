import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const logo = (
    <span style={{ display: "flex", alignItems: "center" }}>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="30" viewBox="1132.06 418.099 67.133 59.61" width="30">
            <defs>
                <path d="M5.667-4.878c-.383.072-.526.359-.526.586 0 .287.227.383.394.383.359 0 .61-.311.61-.634 0-.502-.574-.73-1.076-.73-.73 0-1.136.718-1.243.945-.275-.896-1.017-.944-1.232-.944C1.374-5.272.73-3.706.73-3.443c0 .048.048.108.132.108.095 0 .12-.072.143-.12.407-1.327 1.208-1.578 1.554-1.578.538 0 .646.502.646.789 0 .263-.072.538-.215 1.112l-.407 1.638C2.403-.777 2.056-.12 1.422-.12c-.06 0-.358 0-.609-.155a.617.617 0 0 0 .526-.586c0-.239-.18-.382-.406-.382a.623.623 0 0 0-.598.633c0 .502.562.73 1.076.73.574 0 .98-.455 1.231-.945.191.705.79.945 1.231.945 1.22 0 1.865-1.567 1.865-1.83 0-.06-.047-.107-.12-.107-.107 0-.119.06-.154.155C5.14-.61 4.447-.12 3.909-.12c-.418 0-.645-.31-.645-.8 0-.264.048-.455.239-1.244L3.92-3.79c.18-.717.586-1.243 1.136-1.243.024 0 .359 0 .61.155Z" id="a" />
            </defs>
            <g transform="scale(5)">
                <use x="229.8" xlinkHref="#a" y="92.154" />
                <path d="M226.412 83.62h13.427v.399h-13.427z" />
                <path d="M226.412 83.819h.399v11.524h-.399zM239.441 83.819h.399v11.524h-.399z" />
                <path d="M226.412 95.143h13.427v.399h-13.427z" />
            </g>
        </svg>
        <span style={{ marginLeft: "5px", fontWeight: 500 }}>BOARDFLARE</span>
    </span>
);

export default {
    logo: logo,
    // project: {
    //     link: 'https://github.com/Bolleman/boardflare',
    // },
    // docsRepositoryBase: 'https://github.com/Bolleman/boardflare/tree/main/',
    footer: {
        content: (
            <span>
                Boardflare ©{' '} {new Date().getFullYear()}
            </span>
        )
    },
    head() {
        const { asPath } = useRouter()
        const { frontMatter } = useConfig()
        const url =
            'https://www.boardflare.com' + asPath

        return (
            <>
                <title>{frontMatter.title ? `${frontMatter.title} – Boardflare` : 'Boardflare'}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <meta property="og:url" content={url} />
                <link rel="canonical" href={url} />
                <meta property="og:title" content={frontMatter.title || 'Boardflare'} />
                <meta
                    property="og:description"
                    content={frontMatter.description || 'AI as a Function'}
                />
            </>
        )
    },
    search: {
        placeholder: 'Search...',
    },
    feedback: {
        content: null,
    },
    editLink: {
        component: null,
    },
    sidebar: {
        defaultMenuCollapseLevel: 1,
        autoCollapse: true,
    },
    toc: {
        float: true,
        // extraContent() {
        //     const { frontMatter } = useConfig();
        //     const { title, icon } = frontMatter;
        //     const iconPath = `/icons/${icon}`;
        //     console.log(title, icon);
        //     return (
        //         <>
        //             <img src={iconPath} alt={title} style={{ width: "128px" }} />
        //         </>
        //     );
        // }
    },
    // gitTimestamp: {
    //     returnTime() {
    //         return timestamp
    //     }
    // },
    navigation: false,
    // ... other theme options
}