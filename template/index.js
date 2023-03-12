import Handlebars from "handlebars";

Handlebars.registerHelper('or', function(arg1, arg2, options) {
  if (arg1 || arg2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

const template = ` # Automatically Generated by Vagrant Config Generator, see https://github.com/jianan1104/vagrant-cofing-generator
Vagrant.configure('2') do |config|
  config.vm.box = '{{box}}'
  {{#if ip}}
  config.vm.network "private_network", ip: '{{ip}}'
  {{/if}}
  {{#if hostname}}
  config.vm.hostname = '{{hostname}}'
  {{/if}}
  {{#if provider}}
  config.vm.provider "{{provider}}" do |vb|
  {{#if cpus}}
    vb.cpus = '{{cpus}}'
  {{/if}}
  {{#if memory}}
    vb.memory = '{{memory}}'
  {{/if}}
  {{#or cpus memory}}
  end
  {{/or}}
  {{/if}}
end`;

export default template;