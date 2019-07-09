import { flags, SfdxCommand} from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
// import * as fs from 'fs';
import * as path from 'path';
import { CreateUtil } from '../../../../createUtil';
import LightningAppGenerator from '../../../../lightningAppGenerator';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('force-language-services', 'lightningapp');

export default class LightningComponent extends SfdxCommand {
    public static examples = [
        '$ sfdx force:lightning:app:create -n myapp',
        '$ sfdx force:lightning:app:create -n myapp -d aura'
        ];

    public static description = messages.getMessage('commandDescription');

    protected static flagsConfig = {
        outputdir: flags.string({char: 'd', description: messages.getMessage('outputdir'), required: false, default: process.cwd()}),
        apiversion: flags.builtin(),
        appname: flags.string({char: 'n', description: messages.getMessage('appname'), required: true}),
        template: flags.string({char: 't', description: messages.getMessage('template'), default: 'DefaultLightningApp', options: CreateUtil.getTemplates(/.app$/, __dirname)})
    };

    public async run(): Promise<AnyJson> {
        CreateUtil.checkInputs(this.flags.appname);
        CreateUtil.checkInputs(this.flags.template);

        const filepath = CreateUtil.printOutputDir(this.flags.outputdir, process.cwd());
        const fileparts = (filepath).split(path.sep);

        // tslint:disable-next-line:no-unused-expression
        if (!fileparts.includes('aura')) {
            throw new Error(messages.getMessage('MissingAuraDir'));
        }

        const yeoman = require('yeoman-environment');
        const env = yeoman.createEnv();
        env.registerStub(LightningAppGenerator, 'lightningappgenerator');
        return env.run('lightningappgenerator', this.flags);
    }
    }
