<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;


class AppKernel extends Kernel
{
    public function registerBundles ()
    {
        $bundles = [
            // region Core bundles
            new \Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new \Symfony\Bundle\TwigBundle\TwigBundle(),
            new \Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
            // endregion

            // region Application bundles
            new Becklyn\GluggiBundle\GluggiBundle(),
            new \LayoutBundle\LayoutBundle(),
            // endregion
        ];

        if (in_array($this->getEnvironment(), ['dev', 'test'], true))
        {
            $bundles[] = new \Symfony\Bundle\DebugBundle\DebugBundle();
            $bundles[] = new \Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new \Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
        }

        return $bundles;
    }



    /**
     * @inheritdoc
     */
    public function getRootDir ()
    {
        return __DIR__;
    }



    /**
     * @inheritdoc
     */
    public function getCacheDir ()
    {
        return dirname(__DIR__) . '/var/cache/' . $this->getEnvironment();
    }



    /**
     * @inheritdoc
     */
    public function getLogDir ()
    {
        return dirname(__DIR__) . '/var/logs';
    }



    /**
     * @inheritdoc
     */
    public function registerContainerConfiguration (LoaderInterface $loader)
    {
        $loader->load($this->getRootDir() . '/config/config_' . $this->getEnvironment() . '.yml');
    }
}
